import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
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
  useToast,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react';

import { PLATFORM_SETTINGS } from '@/infra/config';
import { CategoryEntity, UserEntity } from '@/domain/models';
import { createCategory } from '@/domain/usecases/categories';

import { PageLayout } from '@/layout';

const registerCategoryFormSchema = z.object({
  name: z
    .string()
    .nonempty('Category name is required.')
    .min(3, 'The category name must contain a maximum of 3 characters.')
    .max(12, 'The description must contain a maximum of 12 characters.')
});

type RegisterCategoryFormData = z.infer<typeof registerCategoryFormSchema>;

export default function CreateCategory() {
  const { push } = useRouter();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty }
  } = useForm<RegisterCategoryFormData>({
    resolver: zodResolver(registerCategoryFormSchema)
  });

  const onSubmit = async ({ name }: RegisterCategoryFormData) => {
    const newCategory: CategoryEntity = {
      id: name.replace(' ', '-').trim(),
      name
    };

    const { status } = await createCategory(newCategory);

    if (status === 201) {
      toast({
        title: 'Success',
        description: 'Category created.',
        status: 'success',
        duration: 9000,
        isClosable: true
      });

      push('/dashboard/admin/categories');
    } else {
      toast({
        title: 'Error',
        description: 'Unable to create category.',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
  };

  return (
    <PageLayout title="Create New Category">
      <Flex align="center" justify="flex-start" width="100%" height="56px">
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
              href={'/dashboard/admin/categories/create'}
            >
              Create Category
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>

      <Stack direction="column" spacing="1rem" mb="2rem">
        <Center>
          <Text fontSize="title" color="white" fontWeight="bold">
            CREATE CATEGORY
          </Text>
        </Center>
      </Stack>

      <Stack as="form" spacing="1rem" onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Boolean(errors.name)}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            placeholder="<category name>"
            rounded="none"
            {...register('name')}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        <Button type="submit" isLoading={isSubmitting} isDisabled={!isDirty}>
          Register
        </Button>
      </Stack>
    </PageLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies: string = PLATFORM_SETTINGS.cookies.USER_CREDENTIALS_KEY;
  const { [cookies]: credentials } = parseCookies(ctx);

  if (credentials) {
    const parsedCredentials: UserEntity = JSON.parse(credentials);

    if (!parsedCredentials.isAdmin) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false
        }
      };
    }
  } else {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};
