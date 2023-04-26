import { httpClient } from '@/infra/http';

export const getAllUsers = async () => {
  try {
    const { data } = await httpClient.get('/users');

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to fetch users data.');
  }
};
