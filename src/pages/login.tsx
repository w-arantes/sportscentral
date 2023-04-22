import NextLink from 'next/link';
import {
  Button,
  Text,
  Flex,
  Center,
  Input,
  Stack,
  Link,
  FormControl,
  FormErrorMessage,
  FormLabel
} from '@chakra-ui/react';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { PageLayout } from '@/layout';

const loginFormSchema = z.object({
  email: z.string().nonempty('E-mail is required.'),
  password: z
    .string()
    .nonempty('Password is required.')
    .min(6, 'Password must be at least 6 characters long.')
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export default function Login() {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema)
  });

  const onSubmit = (credentials: LoginFormData) => {
    console.log('LOGIN', credentials);

    push('/dashboard');
  };

  return (
    <PageLayout title="Login">
      <Stack direction="column" spacing="1rem" mb="2rem">
        <Center>
          <Text fontSize="title" color="white" fontWeight="bold">
            LOG IN
          </Text>
        </Center>

        <Flex direction="row" align="center" justify="space-between">
          <Text fontSize="h2">NEW TO SPORTSCENTRAL? &nbsp;</Text>

          <Link as={NextLink} href="/sign-up">
            <Text
              fontSize="h2"
              color="brand.primary"
              _hover={{
                color: 'brand.light'
              }}
            >
              CREATE AN ACCOUNT
            </Text>
          </Link>
        </Flex>
      </Stack>

      <Stack as="form" spacing="1rem" onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Boolean(errors.email)}>
          <FormLabel>E-mail</FormLabel>
          <Input
            type="email"
            placeholder="Email"
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
            placeholder="Password"
            rounded="none"
            {...register('password')}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Button type="submit" isLoading={isSubmitting}>
          Continue
        </Button>
      </Stack>
    </PageLayout>
  );
}
