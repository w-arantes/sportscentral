import { UserType } from './user';

export interface EventEntity {
  id: string;
  title: string;
  description?: string;
  category: string;
  date: string;
  location: string;
  followers: UserType[];
}
