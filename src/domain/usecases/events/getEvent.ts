import { httpClient } from '@/infra/http';

export const getEvent = async (eventId: string) => {
  try {
    const { data } = await httpClient.get('/events', {
      params: {
        id: eventId
      }
    });

    return data[0];
  } catch (error) {
    console.error(error);
    throw new Error('Unable to find event data.');
  }
};
