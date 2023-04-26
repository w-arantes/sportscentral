import { GetStaticPaths, GetStaticProps } from 'next';

import { PLATFORM_SETTINGS } from '@/infra/config';
import { CategoryEntity, EventEntity } from '@/domain/models';
import { getAllCategories } from '@/domain/usecases/categories';
import { getEventsByCategory } from '@/domain/usecases/events';

import { PageLayout, Section } from '@/layout';
import { CategoryHeader } from '@/components/Categories';
import { EventCard, NoEventsCard } from '@/components/Event';

interface EventsByCategoryProps {
  events: EventEntity[];
  category: string;
}

export default function EventsByCategory({
  events,
  category
}: EventsByCategoryProps) {
  return (
    <PageLayout
      title={`All Events by Category ${category.toUpperCase()} | SportsCentral`}
    >
      <CategoryHeader categoryName={category} />

      <Section title="All Events">
        {events && events.length > 0 ? (
          <>
            {events.map((event: EventEntity) => {
              return (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  category={event.category}
                  startDate={event.startDate}
                  endDate={event.endDate}
                  location={event.location}
                  followers={event.followers}
                />
              );
            })}
          </>
        ) : (
          <NoEventsCard />
        )}
      </Section>
    </PageLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allCategories: CategoryEntity[] = await getAllCategories();

  const paths = allCategories?.map((category: CategoryEntity) => {
    return {
      params: { category: category.id }
    };
  });

  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const category = context.params?.category as string;
  const events: EventEntity[] = await getEventsByCategory(category);

  return {
    props: {
      events,
      category
    },
    revalidate: PLATFORM_SETTINGS.ssr.pages.EVENTS_BY_CATEGORY_REVALIDATION
  };
};
