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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react';
import { TrashSimple, PencilSimple } from '@phosphor-icons/react';

import { useAuth } from '@/contexts';
import { CategoryEntity } from '@/domain/models';
import { deleteEvent } from '@/domain/usecases/events';
import { getAllCategories } from '@/domain/usecases/categories';

import { PageLayout } from '@/layout';

export default function ManageCategories() {
  const { credentials } = useAuth();
  const { push } = useRouter();

  const [categories, setCategories] = useState<CategoryEntity[] | null>(null);

  const getCategoriesData = async () => {
    const response = await getAllCategories();

    if (response) {
      setCategories(response);
    }
  };

  useEffect(() => {
    if (!credentials?.isAdmin) {
      push('/dashboard');
    }
  }, [credentials]);

  useEffect(() => {
    getCategoriesData();
  }, []);

  const handleRegisterNew = () => {
    console.log('handleRegisterNew');
  };

  const handleEditCategory = () => {
    console.log('handleEditEvent');
  };

  const handleDeleteCategory = async (eventId: string) => {
    const response = deleteEvent(eventId);
    console.log(response);

    getCategoriesData();
  };

  return (
    <PageLayout title="Manage Categories | SportsCentral">
      <Flex align="center" justify="flex-start" w="100%" h="56px">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>Admin</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink isCurrentPage href={'/dashboard/admin/categories'}>
              Categories
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>

      <Flex direction="column" align="center" justify="center">
        <Text fontSize="title" fontWeight="bold" color="white">
          Manage Categories
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
          <Text color="white">All Categories: {categories?.length}</Text>
          <Button onClick={handleRegisterNew}>NEW CATEGORY</Button>
        </Flex>

        <TableContainer mt="2rem">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th color="gray.light">Id</Th>
                <Th color="gray.light">Name</Th>
                <Th color="gray.light">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {categories &&
                categories.map((category: CategoryEntity) => {
                  return (
                    <Tr key={category.id}>
                      <Td>{category?.id}</Td>
                      <Td>{category?.name}</Td>
                      <Td>
                        <Tooltip label="Edit Category" openDelay={500}>
                          <IconButton
                            variant="unstyled"
                            size="md"
                            aria-label="Edit Category"
                            icon={<PencilSimple size={20} color="#00B37E" />}
                            onClick={handleEditCategory}
                          />
                        </Tooltip>
                        <Tooltip label="Delete Category" openDelay={500}>
                          <IconButton
                            variant="unstyled"
                            size="md"
                            aria-label="Delete Category"
                            icon={<TrashSimple size={20} color="#F75A68" />}
                            onClick={() => handleDeleteCategory(category?.id)}
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
