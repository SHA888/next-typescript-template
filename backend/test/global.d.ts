import { NestExpressApplication } from '@nestjs/platform-express';
import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var app: NestExpressApplication;
  // eslint-disable-next-line no-var
  var prisma: PrismaClient;
  // eslint-disable-next-line no-var
  var serverAddress: string;
}

export {};
