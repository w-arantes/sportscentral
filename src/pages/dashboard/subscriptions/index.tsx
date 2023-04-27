import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

import { PLATFORM_SETTINGS } from '@/infra/config';
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
  const { credentials } = useAuth();

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
  }, [credentials]);

  return (
    <PageLayout title="User Subscriptions">
      <Flex align="center" justify="flex-start" width="100%" height="56px">
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
