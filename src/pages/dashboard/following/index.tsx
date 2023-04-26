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

export default function FollowingEvents() {
  const { isAuthenticated, credentials } = useAuth();
  const { push } = useRouter();

  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const [following, setFollowing] = useState<EventEntity[] | null>(null);

  const getFollowingData = async () => {
    if (credentials) {
      const response = await getUserEvents(credentials?.id);

      if (response) {
        setFollowing(response);
      }

      setIsFetchingData(false);
    }
  };

  useEffect(() => {
    if (credentials) {
      setIsFetchingData(true);
      getFollowingData();
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      push('/login');
    }
  }, [isAuthenticated]);

  return (
    <PageLayout title="All Subscriptions">
      <Flex align="center" justify="flex-start" w="100%" h="56px">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={'/dashboard/following'}>
              Following
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>

      <Section
        title="All Subscriptions"
        isLoading={isFetchingData}
        showTotal
        total={following && following.length}
      >
        {following && following.length > 0 ? (
          <>
            {following?.map((event: EventEntity) => {
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
