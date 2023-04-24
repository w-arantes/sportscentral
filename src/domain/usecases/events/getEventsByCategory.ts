import { httpClient } from '@/infra/http';

export const getEventsByCategory = async (category: string) => {
  try {
    const { data } = await httpClient.get('/events', {
      params: {
        category
      }
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to fetch categories data.');
  }
};
