import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient as BasePrismaClient } from "@prisma/client";
import { User, Account, Session } from "@workspace/shared";

@Injectable()
export class PrismaService
  extends BasePrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log("Connected to the database");
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log("Disconnected from the database");
  }

  // Explicitly expose models for better type safety
  get user() {
    return this.user;
  }

  get account() {
    return this.account;
  }

  get session() {
    return this.session;
  }
}
