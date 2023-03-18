export interface RequestUser {
  id: number;
  username: string;
  token: {
    id: number;
    value: string;
    iat: Date;
    exp: Date;
  };
}
