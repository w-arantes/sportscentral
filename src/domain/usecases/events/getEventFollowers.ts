import { EventEntity } from '@/domain/models';
import { httpClient } from '@/infra/http';

export const getEventFollowers = async (
  event: EventEntity,
  userCredentials: Record<string, string>,
  updateType: string
) => {
  const {
    id,
    title,
    description,
    category,
    startDate,
    endDate,
    location,
    followers
  } = event;

  const newUser = [...followers, userCredentials];
  const removeUser = followers.filter((user) => user.id !== userCredentials.id);

  try {
    const { data } = await httpClient.put(`/events/${event.id}`, {
      id,
      title,
      description,
      category,
      startDate,
      endDate,
      location,
      followers: updateType === 'unfollow' ? removeUser : newUser
    });

    return data?.followers;
  } catch (error) {
    console.error(error);
    throw new Error(`Unable to get event ${event.id} data.`);
  }
};
