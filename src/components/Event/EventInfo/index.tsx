import { CategoryTag } from '@/components/Categories';
import { Flex, Text, VStack } from '@chakra-ui/react';
import { CalendarBlank, MapPin } from '@phosphor-icons/react';

import { EventEntity } from '@/domain/models';

interface EventInfoProps
  extends Omit<EventEntity, 'startDate' | 'endDate' | 'id' | 'followers'> {
  date: string;
}

export function EventInfo({
  title,
  category,
  date,
  location,
  description
}: EventInfoProps) {
  return (
    <Flex
      data-cy="EventInfo"
      direction="column"
      w="100%"
      h="100%"
      align="flex-start"
      justify="flex-start"
      mb="2rem"
    >
      <VStack spacing="1rem" align="flex-start">
        <Text
          data-cy="EventTitle"
          fontSize="title"
          fontWeight="bold"
          color="white"
        >
          {title}
        </Text>
        <Flex
          data-cy="EventCategory"
          direction="row"
          align="center"
          justify="flex-start"
        >
          <CategoryTag name={category} />
        </Flex>
        <Flex direction="row" align="center" justify="flex-start">
          <CalendarBlank size={20} color="#00875F" />
          <Text data-cy="EventDate" fontSize="h1" ml="0.5rem">
            {date}
          </Text>
        </Flex>
        <Flex direction="row" align="center" justify="flex-start">
          <MapPin size={20} color="#00875F" />
          <Text data-cy="EventLocation" fontSize="h1" ml="0.5rem">
            {location}
          </Text>
        </Flex>
        <Flex direction="column" justify="flex-start">
          <Text fontSize="h1" fontWeight="bold" color="white">
            Event Description
          </Text>
          <Text fontSize="h1">{description}</Text>
        </Flex>
      </VStack>
    </Flex>
  );
}
