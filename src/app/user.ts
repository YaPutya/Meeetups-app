export interface User {
  id: number;
  email: string;
  password: string;
  fio: string;
  roles?: {
    name: RoleUser;
  }[];
}

export type RoleUser = 'ADMIN' | 'USER';
