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
  Select,
  Spinner,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useToast
} from '@chakra-ui/react';

import { PageLayout } from '@/layout';
import { EventEntity, UserEntity } from '@/domain/models';
import { getUserById, updateUser } from '@/domain/usecases/users';

const updateFormSchema = z.object({
  email: z.string().nonempty('Email is required').email('Invalid Email'),
  name: z.string().nonempty('Name is required.'),
  surname: z.string().nonempty('Surname is required.'),
  isAdmin: z.string().nonempty('Profile Type is required.')
});

type UpdateFormData = z.infer<typeof updateFormSchema>;

export default function EditUsers() {
  const { query, push } = useRouter();
  const currentUserId = query.id as string;
  const toast = useToast();

  const [user, setUser] = useState<UserEntity | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty }
  } = useForm<UpdateFormData>({
    resolver: zodResolver(updateFormSchema)
  });

  const getUserData = async () => {
    const response = await getUserById(currentUserId);

    if (response) {
      setUser(response);
    }
  };

  useEffect(() => {
    if (currentUserId) {
      getUserData();
    }
  }, [currentUserId]);

  const onSubmit = async (updateForm: UpdateFormData) => {
    const { name, surname, email, isAdmin } = updateForm;

    const updatedUserData = {
      id: user?.id as string,
      email,
      name,
      surname,
      events: user?.events as EventEntity[],
      isAdmin: Boolean(isAdmin),
      password: user?.password
    };

    const { status } = await updateUser(updatedUserData);

    if (status === 200) {
      toast({
        title: 'Success',
        description: 'User updated with success.',
        status: 'success',
        duration: 9000,
        isClosable: true
      });

      push('/dashboard/admin/users');
    } else {
      toast({
        title: 'Error',
        description: 'Unable to update the user. Try again or contact support.',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
  };

  return (
    <PageLayout title="Edit User | SportsCentral">
      <Flex align="center" justify="flex-start" w="100%" h="56px">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>Admin</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={'/dashboard/admin/users'}>
              Users
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              isCurrentPage
              href={`/dashboard/admin/users/edit/${currentUserId}`}
            >
              {currentUserId}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>

      <Stack direction="column" spacing="1rem" mb="2rem">
        <Center>
          <Text fontSize="title" color="white" fontWeight="bold">
            EDIT USER
          </Text>
        </Center>
      </Stack>

      {user ? (
        <Stack as="form" spacing="1rem" onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={Boolean(errors.email)}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder={user.email}
              rounded="none"
              {...register('email')}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.name)}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder={user.name}
              rounded="none"
              {...register('name')}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.surname)}>
            <FormLabel>Surname</FormLabel>
            <Input
              type="text"
              placeholder={user.surname}
              rounded="none"
              {...register('surname')}
            />
            <FormErrorMessage>
              {errors.surname && errors.surname.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.isAdmin)}>
            <FormLabel>Profile Type</FormLabel>
            <Select
              placeholder="Select"
              rounded="none"
              {...register('isAdmin')}
            >
              <Text as="option" value="true" color="gray.medium">
                Admin
              </Text>
              <Text as="option" value="false" color="gray.medium">
                User
              </Text>
            </Select>
            <FormErrorMessage>
              {errors.isAdmin && errors.isAdmin.message}
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
