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

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { PageLayout } from '@/layout/PageLayout';

const registerFormSchema = z
  .object({
    email: z.string().nonempty('Email is required').email('Invalid Email'),
    name: z.string().nonempty('Name is required.'),
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema)
  });

  const onSubmit = (credentials: RegisterFormData) => {
    console.log('SIGN-UP', credentials);
  };

  return (
    <PageLayout>
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
            borderRadius={0}
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
            borderRadius={0}
            {...register('name')}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.password)}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="password"
            borderRadius={0}
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
            borderRadius={0}
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
