import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  VStack,
  Input,
  Text
} from '@chakra-ui/react';

import { PageLayout } from '@/layout';
import { useAuth } from '@/contexts';

const userCredentialsFormSchema = z
  .object({
    name: z.string().nonempty('Name is required.'),
    surname: z.string().nonempty('Surname is required.'),
    email: z.string().nonempty('E-mail is required.').email('Invalid e-mail.'),
    password: z
      .string()
      .nonempty('Password is required.')
      .min(6, 'Password must be at least 6 characters long.'),
    confirmPassword: z.string().nonempty('Password confirmation is required.')
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The password confirmation did not match.'
      });
    }
  });

type ProfileFormData = z.infer<typeof userCredentialsFormSchema>;

export default function ProfileSettings() {
  const { isAuthenticated, credentials, updateProfileData } = useAuth();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty }
  } = useForm<ProfileFormData>({
    resolver: zodResolver(userCredentialsFormSchema)
  });

  useEffect(() => {
    if (!isAuthenticated) {
      push('/login');
    }
  }, [isAuthenticated]);

  const onSubmit = (newData: ProfileFormData) => {
    const { email, name, surname, password } = newData;

    if (isAuthenticated && credentials) {
      const updatedData = {
        id: credentials?.id,
        isAdmin: credentials?.isAdmin,
        email,
        name,
        surname,
        password
      };

      updateProfileData(updatedData);
    }
  };

  return (
    <PageLayout title="Profile Settings | SportsCentral">
      <Flex direction="column" align="center" justify="center">
        <Text fontSize="title" fontWeight="bold" color="white">
          Profile Settings
        </Text>
      </Flex>

      <Flex direction="column" align="flex-start" justify="center">
        <VStack as="form" spacing="1.5rem" onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={Boolean(errors.name)}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder={credentials?.name}
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
              placeholder={credentials?.surname}
              rounded="none"
              {...register('surname')}
            />
            <FormErrorMessage>
              {errors.surname && errors.surname.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.email)}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder={credentials?.email}
              rounded="none"
              {...register('email')}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
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
            UPDATE
          </Button>
        </VStack>
      </Flex>
    </PageLayout>
  );
}
