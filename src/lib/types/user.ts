import type { UserAuth } from '@prisma/client';

export type AuthenticatedUser = UserAuth | null;
