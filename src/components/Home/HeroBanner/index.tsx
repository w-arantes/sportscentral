import Image from 'next/image';
import { Flex, Center, Text } from '@chakra-ui/react';

export function HeroBanner() {
  return (
    <Flex
      direction="row"
      justify="space-between"
      width="100%"
      height="520px"
      bg="shadow"
      px="4rem"
      borderLeft="2px solid"
      borderColor="brand.primary"
    >
      <Flex
        width="100%"
        height="100%"
        direction="column"
        align="flex-start"
        justify="center"
      >
        <Text fontSize="h1" fontWeight="bold" color="brand.primary">
          MADE FOR
        </Text>
        <Text fontSize="hero" fontWeight="bold" color="white">
          SPORTS LOVERS
        </Text>
        <Text fontSize="h1" fontWeight="light" color="white">
          Follow your favorite sports events and their updates.
        </Text>
      </Flex>
      <Center width="100%" height="100%">
        <Image
          src="/images/homepage/hero.jpg"
          alt="Photograph of football fans"
          width={500}
          height={500}
        />
      </Center>
    </Flex>
  );
}
