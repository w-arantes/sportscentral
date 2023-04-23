import { useEffect } from 'react';
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
  FormLabel
} from '@chakra-ui/react';

import { PageLayout } from '@/layout';
import { useAuth } from '@/contexts';

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

export default function SignUp() {
  const { isAuthenticated } = useAuth();
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema)
  });

  useEffect(() => {
    if (isAuthenticated) {
      push('/dashboard');
    }
  }, [isAuthenticated]);

  const onSubmit = (credentials: RegisterFormData) => {
    console.log('SIGN-UP', credentials);

    push('/dashboard');
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
        <Button type="submit" isLoading={isSubmitting}>
          Register
        </Button>
      </Stack>
    </PageLayout>
  );
}
