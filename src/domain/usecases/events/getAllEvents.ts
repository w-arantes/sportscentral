import { httpClient } from '@/infra/http';

export const getAllEvents = async () => {
  try {
    const { data } = await httpClient.get('/events');

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to fetch events data.');
  }
};
