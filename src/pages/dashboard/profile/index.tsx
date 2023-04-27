import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
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
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useToast
} from '@chakra-ui/react';

import { PLATFORM_SETTINGS } from '@/infra/config';
import { useAuth } from '@/contexts';

import { PageLayout } from '@/layout';

const userCredentialsFormSchema = z.object({
  name: z.string().nonempty('Name is required.'),
  surname: z.string().nonempty('Surname is required.'),
  email: z.string().nonempty('E-mail is required.').email('Invalid e-mail.')
});

type ProfileFormData = z.infer<typeof userCredentialsFormSchema>;

export default function ProfileSettings() {
  const { credentials, updateProfileData } = useAuth();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty }
  } = useForm<ProfileFormData>({
    resolver: zodResolver(userCredentialsFormSchema)
  });

  const onSubmit = async (newData: ProfileFormData) => {
    const { email, name, surname } = newData;

    if (credentials) {
      const newProfileData = {
        id: credentials?.id,
        email,
        isAdmin: credentials?.isAdmin,
        name,
        surname,
        password: credentials?.password,
        events: credentials?.events
      };

      const response = await updateProfileData(newProfileData);

      if (response) {
        return toast({
          title: 'Success',
          description: 'Profile updated with success.',
          status: 'success',
          duration: 9000,
          isClosable: true
        });
      } else {
        return toast({
          title: 'Error',
          description: 'Unable to update your profile',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      }
    }
  };

  return (
    <PageLayout title="Profile Settings | SportsCentral">
      <Flex align="center" justify="flex-start" width="100%" height="56px">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={'/dashboard/profile'}>Profile</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>

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

          <Button type="submit" isLoading={isSubmitting} isDisabled={!isDirty}>
            UPDATE
          </Button>
        </VStack>
      </Flex>
    </PageLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies: string = PLATFORM_SETTINGS.cookies.USER_CREDENTIALS_KEY;
  const { [cookies]: credentials } = parseCookies(ctx);

  if (!credentials) {
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
