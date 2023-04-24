import { useEffect } from 'react';
import { useRouter } from 'next/router';
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
  useDisclosure,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react';
import { TrashSimple, PencilSimple } from '@phosphor-icons/react';

import { useAuth } from '@/contexts';
import { formatDate } from '@/helpers';
import { PageLayout } from '@/layout';
import { events } from '@/mock';
import { ConfirmDeleteModal } from '@/components/Modal';

export default function ManageEvents() {
  const { isAuthenticated, credentials } = useAuth();
  const { push } = useRouter();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  useEffect(() => {
    if (isAuthenticated && !credentials?.isAdmin) {
      push('/dashboard');
    } else if (!isAuthenticated) {
      push('/login');
    }
  }, [isAuthenticated, credentials]);

  const handleRegisterNew = () => {
    console.log('handleRegisterNew');
  };

  const handleEditEvent = () => {
    console.log('handleEditEvent');
  };

  const handleDelete = () => {
    console.log('handleDelete');
    onToggle;
  };

  return (
    <PageLayout title="Manage Events | SportsCentral">
      <Flex align="center" justify="flex-start" w="100%" h="56px">
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
        w="100%"
        h="100%"
        bg="gray.medium"
        mt="2rem"
        p="4rem"
      >
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
              {events &&
                events.map((event) => {
                  return (
                    <Tr key={event.id}>
                      <Td>{event?.id}</Td>
                      <Td>{event?.title}</Td>
                      <Td>{event?.category}</Td>
                      <Td>{formatDate(event?.startDate)}</Td>
                      <Td>{formatDate(event?.endDate)}</Td>
                      <Td>
                        <Tooltip label="Edit Event" openDelay={500}>
                          <IconButton
                            variant="unstyled"
                            size="md"
                            aria-label="Edit Event"
                            icon={<PencilSimple size={20} color="#00B37E" />}
                            onClick={handleEditEvent}
                          />
                        </Tooltip>
                        <Tooltip label="Delete Event" openDelay={500}>
                          <IconButton
                            variant="unstyled"
                            size="md"
                            aria-label="Delete Event"
                            icon={<TrashSimple size={20} color="#F75A68" />}
                            onClick={onOpen}
                          />
                        </Tooltip>
                      </Td>
                    </Tr>
                  );
                })}
              <ConfirmDeleteModal
                dialogText="Are you sure you want to delete this event?"
                confirmLabel="YES"
                cancelLabel="NO"
                onConfirm={handleDelete}
                closeDialog={onClose}
                dialogState={isOpen}
              />
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </PageLayout>
  );
}
