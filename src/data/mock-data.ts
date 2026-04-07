import type { User } from '../types';

export const mockAdminUser: User & { password: string } = {
  id: 'admin-1',
  name: 'Admin User',
  email: 'admin@gmail.com',
  role: 'admin',
  password: 'admin_2026!',
};
