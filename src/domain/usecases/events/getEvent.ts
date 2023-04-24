import { httpClient } from '@/infra/http';

export const getEvent = async (eventId: string) => {
  try {
    const { data } = await httpClient.get(`/events/${eventId}`);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to fetch events data.');
  }
};
