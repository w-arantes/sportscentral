import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
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
  useToast
} from '@chakra-ui/react';

import { PLATFORM_SETTINGS } from '@/infra/config';
import { createUser } from '@/domain/usecases/users/createUser';
import { UserEntity } from '@/domain/models';

import { PageLayout } from '@/layout';

const registerFormSchema = z
  .object({
    email: z.string().nonempty('Email is required').email('Invalid Email'),
    name: z.string().nonempty('Name is required.'),
    surname: z.string().nonempty('Surname is required.'),
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
    const { name, surname, email, password } = registerForm;

    const newUser: NewUserCredentials = {
      id: uuidv4(),
      name,
      surname,
      email,
      password,
      isAdmin: false
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

      push('/sign-in');
    } else {
      toast({
        title: 'Error',
        description: 'Unable to create your account.',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
  };

  return (
    <PageLayout title="Sign-Up to SportsCentral">
      <Stack direction="column" spacing="1rem" mb="2rem">
        <Center>
          <Text fontSize="title" color="white" fontWeight="bold">
            CREATE ACCOUNT
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
            placeholder="<your name>"
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies: string = PLATFORM_SETTINGS.cookies.USER_CREDENTIALS_KEY;
  const { [cookies]: credentials } = parseCookies(ctx);

  if (credentials) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};
