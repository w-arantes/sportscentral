import { GetStaticProps } from 'next';

import { PLATFORM_SETTINGS } from '@/infra/config';
import { CategoryEntity, EventEntity } from '@/domain/models';
import { getAllEvents } from '@/domain/usecases/events';
import { getAllCategories } from '@/domain/usecases/categories';

import { PageLayout, Footer, Section } from '@/layout';
import { HeroBanner } from '@/components/Home';
import { CategoryCard, NoCategoriesCard } from '@/components/Categories';
import { EventCard, NoEventsCard } from '@/components/Event';

interface LandingPageProps {
  categories: CategoryEntity[];
  events: EventEntity[];
}

export default function LandingPage({ categories, events }: LandingPageProps) {
  return (
    <PageLayout title="SportsCentral - Made for Sports Lovers" height="100vh">
      <HeroBanner />
      <Section title="Categories" height="250px" data-cy="CategoriesSection">
        {categories && categories.length > 0 ? (
          <>
            {categories?.map((category: CategoryEntity) => {
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
      <Section title="Events" footerLink url="/events" data-cy="EventsSection">
        {events && events.length > 0 ? (
          <>
            {events?.map((event: EventEntity) => {
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
      <Footer />
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
    revalidate: PLATFORM_SETTINGS.ssr.pages.HOMEPAGE_REVALIDATION
  };
};
