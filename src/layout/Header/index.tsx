import {
  Flex,
  HStack,
  Image,
  Tooltip,
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react';
import { SignOut } from '@phosphor-icons/react';

import { useAuth } from '@/contexts';

export function Header() {
  const { isAuthenticated, credentials, signOut } = useAuth();

  return (
    <Flex
      as="header"
      bg="gray.medium"
      justify="space-between"
      align="center"
      w="100%"
      h="80px"
      px="146px"
      direction="row"
      top="0"
      left="0"
      right="0"
    >
      <Image
        src="/branding/logo.svg"
        alt="Logo composed with the company name and icon"
        w="200px"
        h="60px"
      />
      <HStack spacing="2rem" align="center" justify="center">
        {isAuthenticated ? (
          <>
            <Menu>
              <MenuButton>PROFILE</MenuButton>
              <MenuList>
                <Tooltip label="Manage Users" openDelay={1000}>
                  <MenuItem as="a" href="/dashboard/profile">
                    SETTINGS
                  </MenuItem>
                </Tooltip>
                <Tooltip label="Manage Events" openDelay={1000}>
                  <MenuItem as="a" href="/dashboard/subscriptions">
                    SUBSCRIPTIONS
                  </MenuItem>
                </Tooltip>
              </MenuList>
            </Menu>

            {credentials?.isAdmin && (
              <Menu>
                <MenuButton>MANAGE</MenuButton>
                <MenuList>
                  <Tooltip label="Manage Users" openDelay={1000}>
                    <MenuItem as="a" href="/dashboard/admin/users">
                      USERS
                    </MenuItem>
                  </Tooltip>
                  <Tooltip label="Manage Events" openDelay={1000}>
                    <MenuItem as="a" href="/dashboard/admin/events">
                      EVENTS
                    </MenuItem>
                  </Tooltip>
                  <Tooltip label="Manage Categories" openDelay={1000}>
                    <MenuItem as="a" href="/dashboard/admin/categories">
                      CATEGORIES
                    </MenuItem>
                  </Tooltip>
                </MenuList>
              </Menu>
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
          <Menu>
            <MenuButton>ENTER</MenuButton>
            <MenuList>
              <Tooltip label="Sign-in" openDelay={1000}>
                <MenuItem as="a" href="/sign-in">
                  SIGN-IN
                </MenuItem>
              </Tooltip>
              <Tooltip label="Sign-in" openDelay={1000}>
                <MenuItem as="a" href="/sign-up">
                  SIGN-UP
                </MenuItem>
              </Tooltip>
            </MenuList>
          </Menu>
        )}
      </HStack>
    </Flex>
  );
}
