import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

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
  Select,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react';

import { PageLayout } from '@/layout';
import { useAuth } from '@/contexts';
import { createUser } from '@/domain/usecases/users/createUser';
import { UserEntity } from '@/domain/models';

const registerFormSchema = z
  .object({
    email: z.string().nonempty('Email is required').email('Invalid Email'),
    name: z.string().nonempty('Name is required.'),
    surname: z.string().nonempty('Surname is required.'),
    isAdmin: z.string().nonempty('Profile Type is required.'),
    password: z
      .string()
      .nonempty('Password is required.')
      .min(6, 'Password must be at least 6 characters long.'),
    confirmPassword: z.string()
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The password confirmation did not match.'
      });
    }
  });

type RegisterFormData = z.infer<typeof registerFormSchema>;
type NewUserCredentials = Omit<UserEntity, 'events'>;

export default function SignUp() {
  const { isAuthenticated } = useAuth();
  const { push } = useRouter();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema)
  });

  const onSubmit = async (registerForm: RegisterFormData) => {
    const { name, surname, email, password, isAdmin } = registerForm;

    const newUser: NewUserCredentials = {
      id: uuidv4(),
      name,
      surname,
      email,
      password,
      isAdmin: Boolean(isAdmin)
    };

    const { status } = await createUser(newUser);

    if (status === 201) {
      toast({
        title: 'Success',
        description: 'Account created.',
        status: 'success',
        duration: 9000,
        isClosable: true
      });

      push('/dashboard/admin/users');
    } else {
      toast({
        title: 'Error',
        description: 'Unable to create account.',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
  };

  return (
    <PageLayout title="Create New User">
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
              href={'/dashboard/admin/users/create'}
            >
              Create User
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>

      <Stack direction="column" spacing="1rem" mb="2rem">
        <Center>
          <Text fontSize="title" color="white" fontWeight="bold">
            CREATE USER
          </Text>
        </Center>
      </Stack>

      <Stack as="form" spacing="1rem" onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Boolean(errors.email)}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="<your email>"
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
            placeholder="<name>"
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
            placeholder="<surname>"
            rounded="none"
            {...register('surname')}
          />
          <FormErrorMessage>
            {errors.surname && errors.surname.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.isAdmin)}>
          <FormLabel>Profile Type</FormLabel>
          <Select placeholder="Select" rounded="none" {...register('isAdmin')}>
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
        <FormControl isInvalid={Boolean(errors.password)}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="password"
            rounded="none"
            {...register('password')}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.password)}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            placeholder="confirm"
            rounded="none"
            {...register('confirmPassword')}
          />
          <FormErrorMessage>
            {errors.confirmPassword && errors.confirmPassword.message}
          </FormErrorMessage>
        </FormControl>
        <Button type="submit" isLoading={isSubmitting} isDisabled={!isDirty}>
          Register
        </Button>
      </Stack>
    </PageLayout>
  );
}
