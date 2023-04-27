import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

import { PLATFORM_SETTINGS } from '@/infra/config';
import { useAuth } from '@/contexts';
import { CategoryEntity, EventEntity } from '@/domain/models';
import { getUserEvents } from '@/domain/usecases/users';
import { getAllEvents } from '@/domain/usecases/events';
import { getAllCategories } from '@/domain/usecases/categories';

import { PageLayout, Section } from '@/layout';
import { EventCard, NoEventsCard } from '@/components/Event';
import { CategoryCard, NoCategoriesCard } from '@/components/Categories';

export default function Dashboard() {
  const { credentials } = useAuth();

  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const [subscriptions, setSubscriptions] = useState<EventEntity[] | null>(
    null
  );
  const [events, setEvents] = useState<EventEntity[] | null>(null);
  const [categories, setCategories] = useState<CategoryEntity[] | null>(null);

  const getSubscriptionsData = async () => {
    if (credentials) {
      const response = await getUserEvents(credentials?.id);

      if (response) {
        setSubscriptions(response);
      }
    }
  };

  const getCategoriesData = async () => {
    const response = await getAllCategories();

    if (response) {
      setCategories(response);
    }
  };

  const getEventsData = async () => {
    const response = await getAllEvents();

    if (response) {
      setEvents(response);
    }
  };

  const getDashboardData = async () => {
    setIsFetchingData(true);

    Promise.all([
      getSubscriptionsData(),
      getEventsData(),
      getCategoriesData()
    ]).finally(() => {
      setIsFetchingData(false);
    });
  };

  useEffect(() => {
    if (credentials) {
      getDashboardData();
    }
  }, [credentials]);

  return (
    <PageLayout title="Dashboard | SportsCentral">
      <Section
        title="Subscriptions"
        isLoading={isFetchingData}
        footerLink={subscriptions && subscriptions.length > 0 ? true : false}
        url="/dashboard/subscriptions"
        showTotal
        total={subscriptions && subscriptions.length}
      >
        {subscriptions && subscriptions.length > 0 ? (
          <>
            {subscriptions?.map((event: EventEntity) => {
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
      <Section
        title="Events"
        isLoading={isFetchingData}
        footerLink
        url="/events"
        showTotal
        total={events && events.length}
      >
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
      <Section
        title="Categories"
        isLoadingCategories={isFetchingData}
        height="250px"
      >
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
    </PageLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies: string = PLATFORM_SETTINGS.cookies.USER_CREDENTIALS_KEY;
  const { [cookies]: credentials } = parseCookies(ctx);

  if (!credentials) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};
