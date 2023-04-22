import { Flex, Img, Text } from '@chakra-ui/react';

export function Footer() {
  const CURRENT_YEAR = new Date().getFullYear();

  return (
    <Flex
      as="footer"
      direction="column"
      align="center"
      justify="center"
      position="fixed"
      width="100%"
      height="100px"
      bottom="0"
      left="0"
      right="0"
      pt="1rem"
    >
      <Img src="/branding/icon.svg" />
      <Text mt="1rem">{`@ ${CURRENT_YEAR} SportsCentral`}</Text>
    </Flex>
  );
}
