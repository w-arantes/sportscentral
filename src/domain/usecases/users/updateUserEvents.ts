import { httpClient, HttpClientDefaultResponse } from '@/infra/http';
import { UserEntity, EventEntity } from '@/domain/models';

export const updateUserEvents = async (
  userCredentials: UserEntity,
  newEvent: EventEntity
): Promise<HttpClientDefaultResponse> => {
  const { id, email, name, surname, events, isAdmin, password } =
    userCredentials;

  const updatedEvents = [...events, newEvent];

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
    throw new Error(`Unable to update user ${id} events`);
  }
};
