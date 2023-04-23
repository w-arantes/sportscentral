import { useRouter } from 'next/router';
import { Flex, HStack, Img, Tooltip, Avatar, Button } from '@chakra-ui/react';

import { useAuth } from '@/contexts';

export function Header() {
  const { isAuthenticated, credentials } = useAuth();
  const { push } = useRouter();

  console.log(credentials);

  return (
    <Flex
      as="header"
      bg="gray.medium"
      justify="space-between"
      alignItems="center"
      w="100%"
      h="80px"
      px="146px"
      direction="row"
      top="0"
      left="0"
      right="0"
    >
      <Img
        src="/branding/logo.svg"
        alt="Logo composed with the company name and icon"
        w="200px"
        h="60px"
      />
      <Flex direction="row" align="flex-end" justify="flex-end">
        <HStack spacing="1rem">
          {isAuthenticated ? (
            <>
              <Tooltip label="View and manage your profile" openDelay={500}>
                <Button
                  variant="header"
                  onClick={() => push('/dashboard/profile')}
                >
                  PROFILE
                </Button>
              </Tooltip>
              {credentials?.isAdmin && (
                <Tooltip label="Manage users and events" openDelay={500}>
                  <Button
                    variant="header"
                    onClick={() => push('/dashboard/manage')}
                  >
                    MANAGE
                  </Button>
                </Tooltip>
              )}
              <Avatar name={credentials?.name} bg="brand.light" />
            </>
          ) : (
            <Tooltip label="Log-in into SportsCentral" openDelay={500}>
              <Button variant="header" onClick={() => push('/login')}>
                LOGIN
              </Button>
            </Tooltip>
          )}
        </HStack>
      </Flex>
    </Flex>
  );
}
