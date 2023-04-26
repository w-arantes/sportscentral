import { httpClient } from '@/infra/http';

export const getUserById = async (id: string) => {
  try {
    const { data } = await httpClient.get('/users', {
      params: {
        id
      }
    });

    return data[0];
  } catch (error) {
    console.error(error);
    throw new Error('Unable to find the user.');
  }
};
