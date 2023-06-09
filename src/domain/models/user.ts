import { EventEntity } from './event';

export interface UserEntity {
  id: string;
  name: string;
  surname: string;
  email: string;
  password?: string;
  events: EventEntity[];
  isAdmin: boolean;
}
