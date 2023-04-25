import { httpClient, HttpClientDefaultResponse } from '@/infra/http';
import { UserEntity } from '@/domain/models';

export const updateUser = async ({
  id,
  email,
  name,
  surname,
  events,
  isAdmin,
  password
}: UserEntity): Promise<HttpClientDefaultResponse> => {
  try {
    const response = await httpClient.put(`/users/${id}`, {
      id,
      email,
      name,
      surname,
      events,
      isAdmin,
      password
    });

    return response;
  } catch (error) {
    throw new Error(`Unable to update user ${id}`);
  }
};
