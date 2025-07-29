import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export const createTestUser = async (
  app: INestApplication,
  userData: {
    email: string;
    password: string;
    name?: string;
    role?: 'USER' | 'ADMIN';
  }
) => {
  return request(app.getHttpServer())
    .post('/auth/register')
    .send({
      email: userData.email,
      password: userData.password,
      name: userData.name || 'Test User',
      role: userData.role || 'USER',
    });
};

export const loginTestUser = async (
  app: INestApplication,
  credentials: { email: string; password: string }
) => {
  const response = await request(app.getHttpServer()).post('/auth/login').send({
    email: credentials.email,
    password: credentials.password,
  });

  return response.body.access_token;
};

export const getAuthHeader = (token: string) => {
  return `Bearer ${token}`;
};
