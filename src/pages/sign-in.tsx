import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

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
  FormLabel,
  useToast
} from '@chakra-ui/react';

import { useAuth } from '@/contexts';
import { PLATFORM_SETTINGS } from '@/infra/config';

import { PageLayout } from '@/layout';

const loginFormSchema = z.object({
  email: z.string().nonempty('E-mail is required.').email('Invalid E-mail.'),
  password: z
    .string()
    .nonempty('Password is required.')
    .min(6, 'Password must be at least 6 characters long.')
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export default function Login() {
  const { signIn } = useAuth();
  const { push } = useRouter();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema)
  });

  const onSubmit = async (credentials: LoginFormData) => {
    const hasValidCredentials = await signIn(credentials);

    if (hasValidCredentials) {
      push('/dashboard');
    } else {
      toast({
        title: 'Error',
        description:
          'Failed to sign-in. Please verify your credentials and try again.',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
  };

  return (
    <PageLayout title="Sign-in">
      <Stack direction="column" spacing="1rem" mb="2rem">
        <Center>
          <Text fontSize="title" color="white" fontWeight="bold">
            SIGN-IN
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
