import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  IconButton,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Tooltip
} from '@chakra-ui/react';
import { TrashSimple, PencilSimple } from '@phosphor-icons/react';

import { PageLayout } from '@/layout';
import { useAuth } from '@/contexts';
import { users } from '@/mock';

export default function ManageUsers() {
  const { isAuthenticated, credentials } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (isAuthenticated && !credentials?.isAdmin) {
      push('/dashboard');
    } else if (!isAuthenticated) {
      push('/login');
    }
  }, [isAuthenticated, credentials]);

  const handleRegisterNew = () => {
    console.log('handleRegisterNew');
  };

  const handleEditUser = () => {
    console.log('handleEditUser');
  };

  const handleDelete = () => {
    console.log('handleDelete');
  };

  return (
    <PageLayout title="Manage Users | SportsCentral" mt="1rem">
      <Flex direction="column" align="center" justify="center">
        <Text fontSize="title" fontWeight="bold" color="white">
          Manage Users
        </Text>
      </Flex>

      <Flex
        direction="column"
        w="100%"
        h="100%"
        bg="gray.medium"
        mt="2rem"
        p="4rem"
      >
        <Flex direction="row" align="center" justify="space-between">
          <Text color="white">All Users: {users?.length}</Text>
          <Button onClick={handleRegisterNew}>NEW USER</Button>
        </Flex>

        <TableContainer mt="2rem">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th color="gray.light">Id</Th>
                <Th color="gray.light">Name</Th>
                <Th color="gray.light">Surname</Th>
                <Th color="gray.light">Admin Features</Th>
                <Th color="gray.light">E-mail</Th>
                <Th color="gray.light">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users &&
                users.map((user) => {
                  return (
                    <Tr key={user.id}>
                      <Td>{user?.id}</Td>
                      <Td>{user?.name}</Td>
                      <Td>{user?.surname}</Td>
                      <Td>{user?.isAdmin ? 'Yes' : 'No'}</Td>
                      <Td>{user?.email}</Td>
                      <Td>
                        <Tooltip label="Edit User" openDelay={500}>
                          <IconButton
                            variant="unstyled"
                            size="md"
                            aria-label="Edit User"
                            icon={<PencilSimple size={20} color="#00B37E" />}
                            onClick={handleEditUser}
                          />
                        </Tooltip>
                        <Tooltip label="Delete User" openDelay={500}>
                          <IconButton
                            variant="unstyled"
                            size="md"
                            aria-label="Delete User"
                            icon={<TrashSimple size={20} color="#F75A68" />}
                            onClick={handleDelete}
                          />
                        </Tooltip>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </PageLayout>
  );
}
