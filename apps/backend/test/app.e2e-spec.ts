import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { getTestApp, getPrisma } from "./setup";

describe("AppController (e2e)", () => {
  let app: INestApplication;
  let prisma: any;

  beforeAll(async () => {
    app = getTestApp();
    prisma = getPrisma();
  });

  it("should be defined", () => {
    expect(app).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it("should connect to the database", async () => {
    // Simple query to test database connection
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    expect(result).toBeDefined();
    expect(result[0].test).toBe(1);
  });
});
