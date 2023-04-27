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
  BreadcrumbLink,
  useToast,
  Spinner
} from '@chakra-ui/react';
import { TrashSimple, PencilSimple } from '@phosphor-icons/react';

import { useAuth } from '@/contexts';
import { CategoryEntity } from '@/domain/models';
import { deleteCategory, getAllCategories } from '@/domain/usecases/categories';

import { PageLayout } from '@/layout';

export default function ManageCategories() {
  const { credentials } = useAuth();
  const { push } = useRouter();
  const toast = useToast();

  const [categories, setCategories] = useState<CategoryEntity[] | null>(null);

  const getCategoriesData = async () => {
    const response = await getAllCategories();

    if (response) {
      setCategories(response);
    }
  };

  useEffect(() => {
    getCategoriesData();
  }, []);

  const handleRegisterNew = () => {
    push('/dashboard/admin/categories/create');
  };

  const handleEditCategory = (categoryId: string) => {
    push(`/dashboard/admin/categories/edit/${categoryId}`);
  };

  const handleDeleteCategory = async (eventId: string) => {
    const { status } = await deleteCategory(eventId);

    if (status === 200) {
      getCategoriesData();

      toast({
        title: 'Success',
        description: 'Category deleted with success.',
        status: 'success',
        duration: 9000,
        isClosable: true
      });
    } else {
      toast({
        title: 'Error',
        description:
          'Unable to delete the category, try again or contact support.',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
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
        width="100%"
        height="100%"
        bg="gray.medium"
        mt="2rem"
        p="4rem"
      >
        {categories && categories.length > 0 ? (
          <>
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
                  <>
                    {categories.map((category: CategoryEntity) => {
                      return (
                        <Tr key={category.id}>
                          <Td>{category.id}</Td>
                          <Td>{category.name}</Td>
                          <Td width="120px">
                            <Tooltip label="Edit Category" openDelay={500}>
                              <IconButton
                                variant="unstyled"
                                size="md"
                                aria-label="Edit Category"
                                icon={
                                  <PencilSimple size={20} color="#00B37E" />
                                }
                                onClick={() => handleEditCategory(category.id)}
                              />
                            </Tooltip>
                            <Tooltip label="Delete Category" openDelay={500}>
                              <IconButton
                                variant="unstyled"
                                size="md"
                                aria-label="Delete Category"
                                icon={<TrashSimple size={20} color="#F75A68" />}
                                onClick={() =>
                                  handleDeleteCategory(category.id)
                                }
                              />
                            </Tooltip>
                          </Td>
                        </Tr>
                      );
                    })}
                  </>
                </Tbody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <Spinner />
        )}
      </Flex>
    </PageLayout>
  );
}
