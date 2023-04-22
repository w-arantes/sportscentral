import { Flex, Center, Img } from '@chakra-ui/react';

export function Header() {
  return (
    <Flex
      as="header"
      bg="gray.medium"
      position="relative"
      align="center"
      justify="center"
      w="100%"
      h="80px"
      px={['112px']}
      direction="row"
      top="0"
      left="0"
      right="0"
    >
      <Center>
        <Img src="/branding/logo.svg" />
      </Center>
    </Flex>
  );
}
