import { EventEntity } from '@/domain/models';
import { httpClient, HttpClientDefaultResponse } from '@/infra/http';

export const updateEvent = async ({
  id,
  title,
  category,
  description,
  endDate,
  location,
  startDate,
  followers
}: EventEntity): Promise<HttpClientDefaultResponse> => {
  try {
    const response = await httpClient.put(`/events/${id}`, {
      id,
      title,
      category,
      description,
      endDate,
      location,
      startDate,
      followers
    });

    return response;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to update event data.');
  }
};
