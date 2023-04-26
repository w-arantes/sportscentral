import { httpClient, HttpClientDefaultResponse } from '@/infra/http';
import { UserEntity, EventEntity } from '@/domain/models';

export const removeUserEvent = async (
  userCredentials: UserEntity,
  eventId: string
): Promise<HttpClientDefaultResponse> => {
  const { id, email, name, surname, events, isAdmin, password } =
    userCredentials;

  const updatedEvents = events.filter(
    (event: EventEntity) => event.id !== eventId
  );

  try {
    const response = await httpClient.put(`/users/${id}`, {
      id,
      email,
      name,
      surname,
      events: updatedEvents,
      isAdmin,
      password
    });

    return response;
  } catch (error) {
    throw new Error(
      `Unable to remove from the user ${id} the event ${eventId}`
    );
  }
};
