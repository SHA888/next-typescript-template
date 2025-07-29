export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'ADMIN' | 'USER';
  emailVerified?: Date | null;
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserWithTokens {
  user: User;
  accessToken: string;
  refreshToken: string;
}
