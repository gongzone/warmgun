import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    id: number;
    username: string;
    token: {
      id: number;
      value: string;
      iat: Date;
      exp: Date;
    };
  };
}
