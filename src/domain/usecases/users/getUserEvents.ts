import { httpClient } from '@/infra/http';

export const getUserEvents = async (userId: string) => {
  try {
    const { data } = await httpClient.get(`/users/${userId}`);

    return data.events;
  } catch (error) {
    console.error(error);
    throw new Error(`Unable to find the user ${userId} events.`);
  }
};
