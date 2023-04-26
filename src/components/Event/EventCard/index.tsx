import NextLink from 'next/link';
import { Flex, Box, Text, Image, Link, Stack, Tooltip } from '@chakra-ui/react';
import { CalendarBlank, MapPin, Heart } from '@phosphor-icons/react';

import { EventEntity } from '@/domain/models';
import { formatDateRange } from '@/helpers';
import { CategoryTag } from '@/components/Categories';

export function EventCard({
  id,
  title,
  category,
  startDate,
  endDate,
  location,
  followers
}: EventEntity) {
  return (
    <Link
      as={NextLink}
      href={`/event/${id}`}
      _hover={{
        textDecoration: 'none'
      }}
    >
      <Tooltip label="Click to show event details" openDelay={500}>
        <Flex
          direction="column"
          minWidth="296px"
          height="340px"
          bg="gray.medium"
          _hover={{
            border: '1px solid',
            borderColor: 'brand.primary',
            opacity: '0.9',
            transition: 'border-color 0.2s'
          }}
        >
          <Box width="100%" height="160px">
            <Image
              src={`/images/categories/${category}.png`}
              alt={`Event category default image - ${category}`}
              fallbackSrc="/images/categories/default.png"
              width="100%"
              height="160px"
              objectFit="cover"
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
                {formatDateRange(startDate, endDate)}
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
