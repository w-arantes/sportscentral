import { httpClient } from '@/infra/http';

export const deleteEvent = async (eventId: string) => {
  try {
    const response = await httpClient.delete(`/events/${eventId}`);

    return response;
  } catch (error) {
    console.error(error);
    throw new Error(`Unable to delete event ${eventId}.`);
  }
};
