import type { User } from '@prisma/client';

export type CurrentUser = Pick<User, 'id' | 'role'> | null;
