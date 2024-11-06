export interface JwtPayload {
  userName: string;
  userId: string;
  expiration?: Date;
}
