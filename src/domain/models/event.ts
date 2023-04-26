import { UserEntity } from './user';

export interface EventEntity {
  id: string;
  title: string;
  description?: string;
  category: string;
  startDate: string;
  endDate: string;
  location: string;
  followers: UserEntity[];
}
