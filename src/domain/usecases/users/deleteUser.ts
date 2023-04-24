import { httpClient } from '@/infra/http';

export const deleteUser = async (userId: string) => {
  try {
    const response = await httpClient.delete(`/users/${userId}`);

    return response;
  } catch (error) {
    console.error(error);
    throw new Error(`Unable to delete user ${userId}.`);
  }
};
