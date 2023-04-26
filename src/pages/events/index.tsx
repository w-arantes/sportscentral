import { GetStaticProps } from 'next';

import { PLATFORM_SETTINGS } from '@/infra/config';
import { CategoryEntity, EventEntity } from '@/domain/models';
import { getAllEvents } from '@/domain/usecases/events';

import { PageLayout, Section } from '@/layout';
import { EventCard, NoEventsCard, EventsHeader } from '@/components/Event';
import { CategoryCard, NoCategoriesCard } from '@/components/Categories';
import { getAllCategories } from '@/domain/usecases/categories';

interface EventsProps {
  events: EventEntity[];
  categories: CategoryEntity[];
}

export default function Events({ events, categories }: EventsProps) {
  return (
    <PageLayout title="Events | SportsCentral">
      <EventsHeader />

      <Section title="Available Events">
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
      <Section title="Available Categories" height="250px">
        {categories && categories.length > 0 ? (
          <>
            {categories.map((category: CategoryEntity) => {
              return (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  name={category.name}
                />
              );
            })}
          </>
        ) : (
          <NoCategoriesCard />
        )}
      </Section>
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const events: EventEntity[] = await getAllEvents();
  const categories: CategoryEntity[] = await getAllCategories();

  return {
    props: {
      events,
      categories
    },
    revalidate: PLATFORM_SETTINGS.ssr.pages.EVENTS_REVALIDATION
  };
};
