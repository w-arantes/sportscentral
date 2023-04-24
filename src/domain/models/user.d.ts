export interface UserEntity {
  id: string;
  name: string;
  surname: string;
  email: string;
  password?: string;
  events: string[];
  isAdmin: boolean;
}
