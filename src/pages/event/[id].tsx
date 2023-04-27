import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Button, Flex, HStack, useToast, Image } from '@chakra-ui/react';

import { PLATFORM_SETTINGS } from '@/infra/config';
import { useAuth } from '@/contexts';
import { EventEntity, UserEntity } from '@/domain/models';
import {
  getEvent,
  getAllEvents,
  getEventFollowers
} from '@/domain/usecases/events';
import { removeUserEvent, updateUserEvents } from '@/domain/usecases/users';
import { formatDateRange } from '@/helpers';

import { PageLayout } from '@/layout';
import { EventBreadcrumb, EventFollowers, EventInfo } from '@/components/Event';

export default function EventPage({
  id,
  title,
  description,
  category,
  startDate,
  endDate,
  followers,
  location
}: EventEntity) {
  const { isAuthenticated, credentials, updateProfileData } = useAuth();
  const { push } = useRouter();
  const toast = useToast();

  const [isFollowingEvent, setIsFollowingEvent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [eventFollowers, setEventFollowers] = useState(followers);

  const currentEvent = {
    id,
    title,
    description,
    category,
    startDate,
    endDate,
    followers,
    location
  };

  const verifyUserEvents = (
    userEvents: EventEntity[],
    currentEventId: string
  ) => {
    const isFollowingCurrentEvent = userEvents.find(
      (event) => event.id === currentEventId
    );

    if (isFollowingCurrentEvent) {
      setIsFollowingEvent(true);
    } else {
      setIsFollowingEvent(false);
    }
  };

  useEffect(() => {
    if (credentials) {
      verifyUserEvents(credentials?.events, id);
    }
  }, [credentials]);

  const updateEventFollowers = async (type: string) => {
    if (credentials) {
      const currentUser = {
        id: credentials.id,
        name: credentials.name,
        surname: credentials.surname
      };

      const updatedInfo = await getEventFollowers(
        currentEvent,
        currentUser,
        type
      );

      if (updatedInfo) {
        setEventFollowers(updatedInfo);
      }
    }
  };

  const handleEditEvent = () => {
    push(`/dashboard/admin/events/edit/${id}`);
  };

  const handleUnfollow = async (eventId: string) => {
    setIsLoading(true);

    const { data } = await removeUserEvent(credentials as UserEntity, eventId);

    if (data) {
      const UPDATE_TYPE_KEY = 'unfollow';

      updateProfileData(data);
      updateEventFollowers(UPDATE_TYPE_KEY);
    } else {
      toast({
        title: 'Error',
        description:
          'Unable to unfollow the event, try again or contact support.',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }

    setIsLoading(false);
  };

  const handleFollowEvent = async (event: EventEntity) => {
    setIsLoading(true);

    const { data } = await updateUserEvents(credentials as UserEntity, event);

    if (data) {
      updateProfileData(data);
      updateEventFollowers(event.id);
    } else {
      toast({
        title: 'Error',
        description:
          'Unable to follow the event, try again or contact support.',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }

    setIsLoading(false);
  };

  return (
    <PageLayout title={`${title} - Event Page | SportsCentral`}>
      <EventBreadcrumb id={id} title={title} category={category} />

      <Flex direction="column" width="100%" height="320px" mb="2rem">
        <Image
          src={`/images/categories/${category}.png`}
          alt="Event category image"
          fallbackSrc="/images/categories/default.png"
          width="608px"
          height="320px"
        />
      </Flex>
      <EventInfo
        title={title}
        date={formatDateRange(startDate, endDate)}
        category={category}
        location={location}
        description={description}
      />
      <HStack
        spacing="2rem"
        align="flex-start"
        justify="flex-start"
        width="100%"
        height="100%"
      >
        {!isAuthenticated ? (
          <Button variant="solid" onClick={() => push('/sign-in')}>
            SIGN-IN TO FOLLOW EVENT
          </Button>
        ) : (
          <>
            {isFollowingEvent ? (
              <Button
                variant="outline"
                onClick={() => handleUnfollow(currentEvent.id)}
                isLoading={isLoading}
              >
                UNFOLLOW EVENT
              </Button>
            ) : (
              <Button
                variant="solid"
                onClick={() => handleFollowEvent(currentEvent)}
                isLoading={isLoading}
              >
                FOLLOW EVENT
              </Button>
            )}
          </>
        )}

        {credentials?.isAdmin && (
          <Button
            variant="outline"
            color="gray.light"
            borderColor="gray.light"
            onClick={handleEditEvent}
          >
            EDIT EVENT
          </Button>
        )}
      </HStack>

      <EventFollowers followers={eventFollowers} />
    </PageLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events: EventEntity[] = await getAllEvents();

  const paths = events?.map((event: EventEntity) => {
    return {
      params: { id: event.id }
    };
  });

  return {
    paths,
    fallback: PLATFORM_SETTINGS.ssr.pages.EVENT.FALLBACK
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const event: EventEntity = await getEvent(id);

  return {
    props: {
      ...event
    },
    revalidate: PLATFORM_SETTINGS.ssr.pages.EVENT.REVALIDATION
  };
};
