import { httpClient } from '@/infra/http';
import { EventEntity } from '@/domain/models';

export const createEvent = async ({
  id,
  title,
  description,
  category,
  startDate,
  endDate,
  location
}: Omit<EventEntity, 'followers'>) => {
  try {
    const response = await httpClient.post('/events', {
      id,
      title,
      description,
      category,
      startDate,
      endDate,
      location,
      followers: []
    });

    return response;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to create event.');
  }
};
