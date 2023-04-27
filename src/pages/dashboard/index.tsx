import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '@/contexts';
import { CategoryEntity, EventEntity } from '@/domain/models';
import { getAllEvents } from '@/domain/usecases/events';
import { getAllCategories } from '@/domain/usecases/categories';

import { PageLayout, Section } from '@/layout';
import { CategoryCard, NoCategoriesCard } from '@/components/Categories';
import { EventCard, NoEventsCard } from '@/components/Event';
import { getUserEvents } from '@/domain/usecases/users';

export default function Dashboard() {
  const { isAuthenticated, credentials } = useAuth();
  const { push } = useRouter();

  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const [events, setEvents] = useState<EventEntity[] | null>(null);
  const [subscriptions, setSubscriptions] = useState<EventEntity[] | null>(
    null
  );
  const [categories, setCategories] = useState<CategoryEntity[] | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      push('/sign-in');
    }
  }, [isAuthenticated]);

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
  }, []);

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
