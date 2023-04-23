import NextLink from 'next/link';
import { Flex, Box, Text, Img, Link, Stack, Tooltip } from '@chakra-ui/react';
import { CalendarBlank, MapPin, Heart } from '@phosphor-icons/react';

import { EventEntity } from '@/entities';
import { CategoryTag } from '@/components/Categories';

export function EventCard({
  id,
  title,
  category,
  date,
  location,
  followers
}: EventEntity) {
  return (
    <Link
      as={NextLink}
      href={`/dashboard/event/${id}`}
      _hover={{
        textDecoration: 'none'
      }}
    >
      <Tooltip label="Click to show event details" openDelay={500}>
        <Flex
          direction="column"
          minWidth="296px"
          height="320px"
          bg="gray.medium"
          _hover={{
            border: '1px solid',
            borderColor: 'brand.primary',
            opacity: '0.9',
            transition: 'border-color 0.2s'
          }}
        >
          <Box w="100%" h="160px">
            <Img
              src={`/images/categories/${category}.png`}
              alt={`Event category default image - ${category}`}
              w="100%"
              h="160px"
            />
          </Box>
          <Stack
            direction="column"
            align="flex-start"
            spacing="0.5rem"
            px="6px"
            mt="6px"
          >
            <Text fontSize="h2" fontWeight="bold" color="white">
              {title}
            </Text>
            <Flex direction="row" align="center" justify="flex-start">
              <CalendarBlank size={20} color="#00875F" />
              <Text fontSize="h3" ml="0.5rem">
                {date}
              </Text>
            </Flex>
            <Flex direction="row" align="center" justify="flex-start">
              <MapPin size={20} color="#00875F" />
              <Text fontSize="h3" ml="0.5rem">
                {location}
              </Text>
            </Flex>
            <Flex direction="row" align="center" justify="flex-start">
              <Heart size={20} color="#00875F" />
              <Text
                fontSize="h3"
                ml="0.5rem"
              >{`${followers?.length} Following`}</Text>
            </Flex>
            <Flex direction="row" align="center" justify="flex-start">
              <CategoryTag name={category} />
            </Flex>
          </Stack>
        </Flex>
      </Tooltip>
    </Link>
  );
}