import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { PrismaClient } from "@app/database";

let app: INestApplication;
const prisma = new PrismaClient();

beforeAll(async () => {
  // Initialize the NestJS application
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();

  // Connect Prisma and clean the database
  await prisma.$connect();
  await cleanDatabase();
});

afterAll(async () => {
  // Clean up and close connections
  await cleanDatabase();
  await prisma.$disconnect();
  if (app) {
    await app.close();
  }
});

async function cleanDatabase() {
  try {
    // Get all model names from the Prisma client
    const models = Object.keys(prisma).filter(
      (key) => !(typeof prisma[key] === "function") && !key.startsWith("_"),
    );

    // Delete all records from each model
    for (const model of models) {
      try {
        await prisma[model].deleteMany({});
      } catch (error) {
        // Ignore errors from tables that don't exist
        if (!error.message.includes("does not exist")) {
          console.error(`Error cleaning ${model}:`, error);
        }
      }
    }
  } catch (error) {
    console.error("Error during database cleanup:", error);
  }
}

export const getTestApp = () => app;
export const getPrisma = () => prisma;
