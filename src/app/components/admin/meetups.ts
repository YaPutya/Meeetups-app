import { User } from 'src/app/user';

export interface Meetups {
  id: number;
  name: string;
  description: string;
  location: string;
  need_to_know: string;
  will_happen: string;
  reason_to_come: string;
  time: Date;
  target_audience: string;
  duration: number;
  createdBy: number;
  fio: string;
  owner: User;
  users: User[];
}
