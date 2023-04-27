import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Flex,
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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useToast
} from '@chakra-ui/react';

import { PageLayout } from '@/layout';
import { CategoryEntity, EventEntity } from '@/domain/models';
import { getAllCategories } from '@/domain/usecases/categories';
import { getEvent, updateEvent } from '@/domain/usecases/events';

const updateEventFormSchema = z
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
      .transform((value) => new Date(value))
      .transform((value) => value.toISOString()),
    endDate: z
      .string()
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
        message: 'End date must be after start date'
      });
    }
  });

type UpdateEventFormData = z.infer<typeof updateEventFormSchema>;

export default function EditEvent() {
  const { query, push } = useRouter();
  const currentEventId = query.id as string;
  const toast = useToast();

  const [categories, setCategories] = useState<CategoryEntity[] | null>(null);
  const [event, setEvent] = useState<EventEntity | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty }
  } = useForm<UpdateEventFormData>({
    resolver: zodResolver(updateEventFormSchema)
  });

  const getEventData = async (eventId: string) => {
    const eventData = await getEvent(eventId);

    if (eventData) {
      setEvent(eventData as EventEntity);
    }
  };

  const getCategoriesData = async () => {
    const response = await getAllCategories();

    if (response) {
      setCategories(response);
    }
  };

  useEffect(() => {
    if (currentEventId) {
      getEventData(currentEventId);
      getCategoriesData();
    }
  }, [currentEventId]);

  const onSubmit = async (updateForm: UpdateEventFormData) => {
    const { title, category, description, endDate, location, startDate } =
      updateForm;

    const updatedEventData = {
      id: event?.id,
      title,
      category,
      description,
      endDate,
      location,
      startDate,
      followers: event?.followers
    };

    const { status } = await updateEvent(updatedEventData as EventEntity);

    if (status === 200) {
      toast({
        title: 'Success',
        description: 'Event updated with success.',
        status: 'success',
        duration: 9000,
        isClosable: true
      });

      push('/dashboard/admin/events');
    } else {
      toast({
        title: 'Error',
        description:
          'Unable to update the event. Try again or contact support.',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
  };

  return (
    <PageLayout title="Edit Event | SportsCentral">
      <Flex align="center" justify="flex-start" w="100%" h="56px">
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
              href={`/dashboard/admin/edit/${currentEventId}`}
            >
              {currentEventId}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>

      <Stack direction="column" spacing="1rem" mb="2rem">
        <Center>
          <Text fontSize="title" color="white" fontWeight="bold">
            EDIT EVENT
          </Text>
        </Center>
      </Stack>

      {event ? (
        <Stack as="form" spacing="1rem" onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={Boolean(errors.title)}>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              placeholder={event.title}
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
              placeholder={event?.description}
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
              placeholder={event?.location}
              rounded="none"
              {...register('location')}
            />
            <FormErrorMessage>
              {errors.location && errors.location.message}
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
