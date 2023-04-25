import { Flex, Text, Box } from '@chakra-ui/react';

export function EventsHeader() {
  return (
    <Flex
      direction="row"
      align="flex-start"
      bg="gray.medium"
      width="100%"
      height="100px"
    >
      <Box w="32px" h="100%" bg="brand.primary" />

      <Flex
        direction="row"
        align="center"
        justify="flex-start"
        width="100%"
        height="100%"
        ml="1rem"
      >
        <Text
          fontSize="section"
          fontWeight="bold"
          color="white"
          casing="uppercase"
        >
          EVENTS
        </Text>
      </Flex>
    </Flex>
  );
}
