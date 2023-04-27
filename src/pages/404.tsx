import NextLink from 'next/link';
import { Center, Flex, Text, Link } from '@chakra-ui/react';

import { PageLayout } from '@/layout';

export default function NotFound() {
  return (
    <PageLayout title="Not Found">
      <Center width="100%" height="500px" mt="2rem" bg="gray.medium">
        <Flex direction="column" align="center" justify="center">
          <Text fontSize="hero" fontWeight="bold" color="white">
            Page not found!
          </Text>
          <Text fontSize="h1">
            Sorry, but the page you were looking for could not be found.
          </Text>

          <Link
            as={NextLink}
            href="/"
            mt="2rem"
            _hover={{
              textDecoration: 'none',
              color: 'brand.primary',
              transition: 'color 0.5s ease'
            }}
          >
            <Text fontSize="h1" fontWeight="bold">
              Return to home page
            </Text>
          </Link>
        </Flex>
      </Center>
    </PageLayout>
  );
}
