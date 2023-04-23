import { GetStaticProps, GetStaticPaths } from 'next';
import { Button, Flex, HStack, Img } from '@chakra-ui/react';

import { PageLayout } from '@/layout';
import { EventEntity } from '@/entities';
import { EventBreadcrumb, EventFollowers, EventInfo } from '@/components/Event';

import { events } from '@/mock';

export default function EventPage({
  id,
  title,
  description,
  category,
  date,
  followers,
  location
}: EventEntity) {
  const handleEditEvent = () => {
    console.log('EDIT EVENT');
  };

  const handleFollowEvent = () => {
    console.log('FOLLOW EVENT');
  };

  return (
    <PageLayout title={`${title} - Event Page | SportsCentral`} mt="1rem">
      <EventBreadcrumb id={id} title={title} category={category} />

      <Flex direction="column" w="100%" h="320px">
        <Img
          src={`/images/categories/${category}.png`}
          alt="Event category image"
          w="608px"
          h="320px"
        />
      </Flex>
      <EventInfo
        title={title}
        date={date}
        category={category}
        location={location}
        description={description}
      />

      <HStack
        spacing="2rem"
        align="flex-start"
        justify="flex-start"
        w="100%"
        h="100%"
      >
        <Button variant="solid" onClick={handleFollowEvent}>
          FOLLOW EVENT
        </Button>
        <Button variant="outline" onClick={handleEditEvent}>
          EDIT EVENT
        </Button>
      </HStack>

      <EventFollowers followers={followers} />
    </PageLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = events?.map((event: EventEntity) => {
    return {
      params: { id: event.id }
    };
  });

  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const event = events.find((event: EventEntity) => event.id === id);

  return {
    props: {
      ...event
    }
  };
};
