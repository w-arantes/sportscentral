import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Button,
  Text,
  Center,
  Input,
  Stack,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Spinner,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useToast
} from '@chakra-ui/react';

import { CategoryEntity } from '@/domain/models';
import { getCategory, updateCategory } from '@/domain/usecases/categories';

import { PageLayout } from '@/layout';

const updateFormSchema = z.object({
  name: z
    .string()
    .nonempty('Category name is required.')
    .min(3, 'The category name must contain a maximum of 3 characters.')
    .max(12, 'The description must contain a maximum of 12 characters.')
});

type UpdateFormData = z.infer<typeof updateFormSchema>;

export default function EditCategory() {
  const { query, push } = useRouter();
  const currentCategoryId = query.id as string;
  const toast = useToast();

  const [category, setCategory] = useState<CategoryEntity | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty }
  } = useForm<UpdateFormData>({
    resolver: zodResolver(updateFormSchema)
  });

  const getCategoryData = async () => {
    const response = await getCategory(currentCategoryId);

    if (response) {
      setCategory(response);
    }
  };

  useEffect(() => {
    if (currentCategoryId) {
      getCategoryData();
    }
  }, [currentCategoryId]);

  const onSubmit = async (updateForm: UpdateFormData) => {
    const { name } = updateForm;

    const { status } = await updateCategory(
      currentCategoryId,
      name.replace(' ', '-').trim(),
      name
    );

    if (status === 200) {
      toast({
        title: 'Success',
        description: 'Category updated with success.',
        status: 'success',
        duration: 9000,
        isClosable: true
      });

      push('/dashboard/admin/categories');
    } else {
      toast({
        title: 'Error',
        description:
          'Unable to update the category. Try again or contact support.',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
  };

  return (
    <PageLayout title="Edit Category | SportsCentral">
      <Flex align="center" justify="flex-start" w="100%" h="56px">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>Admin</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={'/dashboard/admin/categories'}>
              Categories
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              isCurrentPage
              href={`/dashboard/admin/users/edit/${currentCategoryId}`}
            >
              {currentCategoryId}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>

      <Stack direction="column" spacing="1rem" mb="2rem">
        <Center>
          <Text fontSize="title" color="white" fontWeight="bold">
            EDIT CATEGORY
          </Text>
        </Center>
      </Stack>

      {category ? (
        <Stack as="form" spacing="1rem" onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={Boolean(errors.name)}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder={category.name}
              rounded="none"
              {...register('name')}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          <Button type="submit" isLoading={isSubmitting} isDisabled={!isDirty}>
            Update
          </Button>
        </Stack>
      ) : (
        <Spinner />
      )}
    </PageLayout>
  );
}
