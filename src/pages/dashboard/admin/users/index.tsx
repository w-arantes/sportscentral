import { useEffect, useState } from 'react';
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
  Tooltip,
  useDisclosure,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react';
import { TrashSimple, PencilSimple } from '@phosphor-icons/react';

import { useAuth } from '@/contexts';
import { UserEntity } from '@/domain/models';
import { getAllUsers, deleteUser } from '@/domain/usecases/users';
import { PageLayout } from '@/layout';
// import { ConfirmDeleteModal } from '@/components/Modal';

export default function ManageUsers() {
  const { isAuthenticated, credentials } = useAuth();
  const { push } = useRouter();
  // const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  const [users, setUsers] = useState<UserEntity[] | null>(null);

  const getUsersData = async () => {
    const response = await getAllUsers();

    if (response) {
      setUsers(response);
    }
  };

  useEffect(() => {
    if (isAuthenticated && !credentials?.isAdmin) {
      push('/dashboard');
    } else if (!isAuthenticated) {
      push('/login');
    }
  }, [isAuthenticated, credentials]);

  useEffect(() => {
    getUsersData();
  }, []);

  const handleRegisterNew = () => {
    console.log('handleRegisterNew');
  };

  const handleEditUser = () => {
    console.log('handleEditUser');
  };

  const handleDeleteUser = async (userId: string) => {
    const response = await deleteUser(userId);
    console.log(response);

    getUsersData();

    //TODO: add visual feedback and update users action
  };

  return (
    <PageLayout title="Manage Users | SportsCentral">
      <Flex align="center" justify="flex-start" w="100%" h="56px">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>Admin</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink isCurrentPage href={'/dashboard/admin/users'}>
              Users
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>

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
                            onClick={() => handleDeleteUser(user.id)}
                          />
                        </Tooltip>
                      </Td>
                    </Tr>
                  );
                })}
              {/* <ConfirmDeleteModal
                dialogText="Are you sure you want to delete the user?"
                confirmLabel="YES"
                cancelLabel="NO"
                onConfirm={handleDelete}
                closeDialog={onClose}
                dialogState={isOpen}
              /> */}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </PageLayout>
  );
}
