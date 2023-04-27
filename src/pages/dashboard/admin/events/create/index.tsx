import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';

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
  useToast,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react';

import { PLATFORM_SETTINGS } from '@/infra/config';
import { CategoryEntity, UserEntity } from '@/domain/models';
import { getAllCategories } from '@/domain/usecases/categories';
import { createEvent } from '@/domain/usecases/events';

import { PageLayout } from '@/layout';

const registerEventFormSchema = z
  .object({
    title: z
      .string()
      .nonempty('Event title is required.')
      .max(39, 'The title must contain a maximum of 39 characters.'),
    description: z
      .string()
      .max(140, 'The description must contain a maximum of 140 characters.'),
    category: z.string().nonempty('Category is required.'),
    startDate: z
      .string()
      .nonempty('Start date is required.')
      .transform((value) => new Date(value))
      .transform((value) => value.toISOString()),
    endDate: z
      .string()
      .nonempty('End date is required.')
      .transform((value) => new Date(value))
      .transform((value) => value.toISOString()),
    location: z
      .string()
      .nonempty('Event location is required.')
      .max(39, 'The location must contain a maximum of 39 characters.')
  })
  .superRefine(({ startDate, endDate }, ctx) => {
    if (startDate >= endDate) {
      ctx.addIssue({
        code: 'custom',
        path: ['endDate'],
        message: 'End date must be after start date.'
      });
    }
  });

type RegisterEventFormData = z.infer<typeof registerEventFormSchema>;

export default function CreateEvent() {
  const { push } = useRouter();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty }
  } = useForm<RegisterEventFormData>({
    resolver: zodResolver(registerEventFormSchema)
  });

  const [categories, setCategories] = useState<CategoryEntity[] | null>(null);

  const getCategoriesData = async () => {
    const response = await getAllCategories();

    if (response) {
      setCategories(response);
    }
  };

  useEffect(() => {
    getCategoriesData();
  }, []);

  const onSubmit = async (registerForm: RegisterEventFormData) => {
    const { title, category, description, endDate, location, startDate } =
      registerForm;

    const newEvent = {
      id: uuid(),
      title,
      category,
      description,
      endDate,
      location,
      startDate,
      followers: []
    };

    const { status } = await createEvent(newEvent);

    if (status === 201) {
      toast({
        title: 'Success',
        description: 'Event created.',
        status: 'success',
        duration: 9000,
        isClosable: true
      });

      push('/dashboard/admin/events');
    } else {
      toast({
        title: 'Error',
        description: 'Unable to create event.',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
  };

  return (
    <PageLayout title="Sign-Up to SportsCentral">
      <Flex align="center" justify="flex-start" width="100%" height="56px">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>Admin</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={'/dashboard/admin/events'}>
              Events
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              isCurrentPage
              href={'/dashboard/admin/events/create'}
            >
              Create Event
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>

      <Stack direction="column" spacing="1rem" mb="2rem">
        <Center>
          <Text fontSize="title" color="white" fontWeight="bold">
            CREATE EVENT
          </Text>
        </Center>
      </Stack>

      <Stack as="form" spacing="1rem" onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Boolean(errors.title)}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            placeholder="Event title"
            rounded="none"
            {...register('title')}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.description)}>
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            placeholder="Event description"
            rounded="none"
            {...register('description')}
          />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.category)}>
          <FormLabel>Category</FormLabel>
          <Select
            placeholder="Select Category"
            {...register('category')}
            rounded="none"
          >
            {categories && categories.length > 0 && (
              <>
                {categories?.map((category: CategoryEntity) => {
                  return (
                    <Text
                      as="option"
                      key={category.id}
                      value={category.id}
                      color="gray.medium"
                    >
                      {category.name}
                    </Text>
                  );
                })}
              </>
            )}
          </Select>
          <FormErrorMessage>
            {errors.category && errors.category.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.startDate)}>
          <FormLabel>Start Date</FormLabel>
          <Input
            type="datetime-local"
            placeholder="Start date"
            rounded="none"
            {...register('startDate')}
          />
          <FormErrorMessage>
            {errors.startDate && errors.startDate.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.endDate)}>
          <FormLabel>End Date</FormLabel>
          <Input
            type="datetime-local"
            placeholder="End date"
            rounded="none"
            {...register('endDate')}
          />
          <FormErrorMessage>
            {errors.endDate && errors.endDate.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.location)}>
          <FormLabel>Location</FormLabel>
          <Input
            type="text"
            placeholder="Event location"
            rounded="none"
            {...register('location')}
          />
          <FormErrorMessage>
            {errors.location && errors.location.message}
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
