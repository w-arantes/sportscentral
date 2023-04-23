import { useRouter } from 'next/router';
import {
  Flex,
  HStack,
  Img,
  Tooltip,
  Avatar,
  Button,
  IconButton
} from '@chakra-ui/react';
import { SignOut } from '@phosphor-icons/react';

import { useAuth } from '@/contexts';

export function Header() {
  const { isAuthenticated, credentials, signOut } = useAuth();
  const { push } = useRouter();

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
                <>
                  <Tooltip label="Manage users" openDelay={500}>
                    <Button
                      variant="header"
                      onClick={() => push('/dashboard/admin/users')}
                    >
                      USERS
                    </Button>
                  </Tooltip>
                  <Tooltip label="Manage events" openDelay={500}>
                    <Button
                      variant="header"
                      onClick={() => push('/dashboard/admin/events')}
                    >
                      EVENTS
                    </Button>
                  </Tooltip>
                </>
              )}
              <Tooltip label="Sign-out" openDelay={500}>
                <IconButton
                  variant="unstyled"
                  size="md"
                  aria-label="Sign-Out"
                  icon={<SignOut size={20} color="#F75A68" />}
                  onClick={signOut}
                />
              </Tooltip>
              <Avatar
                name={`${credentials?.name + ' ' + credentials?.surname}`}
                bg="brand.light"
              />
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
