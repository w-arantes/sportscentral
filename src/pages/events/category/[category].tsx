import { GetStaticPaths, GetStaticProps } from 'next';

import { PLATFORM_SETTINGS } from '@/infra/config';
import { CategoryEntity, EventEntity } from '@/domain/models';
import { getAllCategories } from '@/domain/usecases/categories';
import { getEventsByCategory } from '@/domain/usecases/events';

import { PageLayout } from '@/layout';

interface EventsByCategoryProps {
  events: EventEntity[];
  category: string;
}

export default function EventsByCategory({ events }: EventsByCategoryProps) {
  return (
    <PageLayout title={`All Events by Category | SportsCentral`}>
      <h1>All Events By Category</h1>

      {events &&
        events.map((event: EventEntity) => {
          return (
            <div key={event.id}>
              <p>{event.title}</p>
            </div>
          );
        })}
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
      events
    },
    revalidate: PLATFORM_SETTINGS.ssr.pages.EVENTS_BY_CATEGORY_REVALIDATION
  };
};
