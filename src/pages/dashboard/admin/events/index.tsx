import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { TrashSimple, PencilSimple } from '@phosphor-icons/react';

import {
  Button,
  IconButton,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useToast,
  Spinner
} from '@chakra-ui/react';

import { PLATFORM_SETTINGS } from '@/infra/config';
import { EventEntity, UserEntity } from '@/domain/models';
import { deleteEvent, getAllEvents } from '@/domain/usecases/events';
import { formatDate } from '@/helpers';

import { PageLayout } from '@/layout';

export default function ManageEvents() {
  const { push } = useRouter();
  const toast = useToast();

  const [events, setEvents] = useState<EventEntity[] | null>(null);

  const getEventsData = async () => {
    const response = await getAllEvents();

    if (response) {
      setEvents(response);
    }
  };

  useEffect(() => {
    getEventsData();
  }, []);

  const handleRegisterNew = () => {
    push('/dashboard/admin/events/create');
  };

  const handleEditEvent = (eventId: string) => {
    push(`/dashboard/admin/events/edit/${eventId}`);
  };

  const handleDeleteEvent = async (eventId: string) => {
    const { status } = await deleteEvent(eventId);

    if (status === 200) {
      getEventsData();

      toast({
        title: 'Success',
        description: 'Event deleted with success.',
        status: 'success',
        duration: 9000,
        isClosable: true
      });
    } else {
      toast({
        title: 'Error',
        description:
          'Unable to delete the event, try again or contact support.',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
  };

  return (
    <PageLayout title="Manage Events | SportsCentral">
      <Flex align="center" justify="flex-start" width="100%" height="56px">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>Admin</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink isCurrentPage href={'/dashboard/admin/events'}>
              Events
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>

      <Flex direction="column" align="center" justify="center">
        <Text fontSize="title" fontWeight="bold" color="white">
          Manage Events
        </Text>
      </Flex>

      <Flex
        direction="column"
        width="100%"
        height="100%"
        bg="gray.medium"
        mt="2rem"
        p="4rem"
      >
        {events && events.length > 0 ? (
          <>
            <Flex direction="row" align="center" justify="space-between">
              <Text color="white">All Events: {events?.length}</Text>
              <Button onClick={handleRegisterNew}>NEW EVENT</Button>
            </Flex>

            <TableContainer mt="2rem">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th color="gray.light">Id</Th>
                    <Th color="gray.light">Title</Th>
                    <Th color="gray.light">Category</Th>
                    <Th color="gray.light">Start Date</Th>
                    <Th color="gray.light">End Date</Th>
                    <Th color="gray.light">Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {events.map((event: EventEntity) => {
                    return (
                      <Tr key={event.id}>
                        <Td>{event.id}</Td>
                        <Td>{event.title}</Td>
                        <Td>{event.category}</Td>
                        <Td>{formatDate(event?.startDate)}</Td>
                        <Td>{formatDate(event?.endDate)}</Td>
                        <Td>
                          <Tooltip label="Edit Event" openDelay={500}>
                            <IconButton
                              variant="unstyled"
                              size="md"
                              aria-label="Edit Event"
                              icon={<PencilSimple size={20} color="#00B37E" />}
                              onClick={() => handleEditEvent(event.id)}
                            />
                          </Tooltip>
                          <Tooltip label="Delete Event" openDelay={500}>
                            <IconButton
                              variant="unstyled"
                              size="md"
                              aria-label="Delete Event"
                              icon={<TrashSimple size={20} color="#F75A68" />}
                              onClick={() => handleDeleteEvent(event.id)}
                            />
                          </Tooltip>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <Spinner />
        )}
      </Flex>
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
