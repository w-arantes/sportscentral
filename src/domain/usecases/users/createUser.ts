import { UserEntity } from '@/domain/models';
import { httpClient, HttpClientDefaultResponse } from '@/infra/http';

export const createUser = async ({
  id,
  name,
  surname,
  email,
  password,
  isAdmin
}: Omit<UserEntity, 'events'>): Promise<HttpClientDefaultResponse> => {
  try {
    const response = await httpClient.post('/users', {
      id,
      name,
      surname,
      email,
      password,
      isAdmin
    });

    return response;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to create user.');
  }
};
