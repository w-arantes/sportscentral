import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '@/contexts';
import { EventEntity } from '@/domain/models';
import { getUserEvents } from '@/domain/usecases/users';

import { PageLayout, Section } from '@/layout';
import { EventCard, NoEventsCard } from '@/components/Event';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex
} from '@chakra-ui/react';

export default function Subscriptions() {
  const { isAuthenticated, credentials } = useAuth();
  const { push } = useRouter();

  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const [subscriptions, setSubscriptions] = useState<EventEntity[] | null>(
    null
  );

  const getSubscriptionsData = async () => {
    if (credentials) {
      const response = await getUserEvents(credentials?.id);

      if (response) {
        setSubscriptions(response);
      }

      setIsFetchingData(false);
    }
  };

  useEffect(() => {
    if (credentials) {
      setIsFetchingData(true);
      getSubscriptionsData();
    }
  }, []);

  return (
    <PageLayout title="User Subscriptions">
      <Flex align="center" justify="flex-start" w="100%" h="56px">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={'/dashboard/subscriptions'}>
              Subscriptions
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>

      <Section
        title="All Subscriptions"
        isLoading={isFetchingData}
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
    </PageLayout>
  );
}
