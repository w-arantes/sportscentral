import { httpClient } from '@/infra/http';

export const getUser = async (email: string, password: string) => {
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
