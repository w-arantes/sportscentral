import { httpClient } from '@/infra/http';
import { UserEntity } from '@/domain/models';

export const getUser = async ({ email, password }: Partial<UserEntity>) => {
  try {
    const { data } = await httpClient.get('/users', {
      params: {
        email,
        password
      }
    });

    return data[0];
  } catch (error) {
    console.error(error);
    throw new Error('Unable to find the user.');
  }
};
