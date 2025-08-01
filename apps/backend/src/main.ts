import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import helmet from "helmet";

// Enable detailed logging
const logger = new Logger("Bootstrap");
process.env.DEBUG = "nest:*";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Log environment variables (without sensitive data)
  logger.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  logger.log(
    `JWT_SECRET: ${process.env.JWT_SECRET ? "***" + process.env.JWT_SECRET.slice(-4) : "NOT SET"}`,
  );
  logger.log(
    `DATABASE_URL: ${process.env.DATABASE_URL ? "***" + process.env.DATABASE_URL.split("@").pop() : "NOT SET"}`,
  );

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  logger.log("Global validation pipe configured");

  // Security middleware
  app.use(helmet());
  app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:5000",
    credentials: true,
  });
  logger.log("Security middleware configured");

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle("Next.js TypeScript Template API")
    .setDescription("API documentation for the Next.js TypeScript Template")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  // Set and log the port
  const port = process.env.PORT || 5002;
  logger.log(`Environment PORT: ${process.env.PORT || 'not set'}`);
  logger.log(`Attempting to start server on port: ${port}`);
  
  // Get the HTTP server instance
  const server = app.getHttpServer();
  
  // Log the actual port the server is listening on
  server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
    logger.log(`Server is listening on ${bind}`);
  });
  
  // Start the server
  await app.listen(port, '0.0.0.0');
  logger.log(`Application is running on: http://localhost:${port}`);
  logger.log(`API documentation available at: http://localhost:${port}/api`);

  // Log all routes
  const router = server._events.request._router;
  const routes = router.stack
    .map((layer) => {
      if (layer.route) {
        return {
          route: {
            path: layer.route?.path,
            method: layer.route?.stack[0].method,
          },
        };
      }
    })
    .filter((item) => item !== undefined);

  logger.log("Available routes:");
  routes.forEach((route) => {
    if (route?.route?.path) {
      logger.log(
        `${route.route.method.toUpperCase().padEnd(6)} ${route.route.path}`,
      );
    }
  });
}

bootstrap().catch((err) => {
  console.error("Error starting the application", err);
  process.exit(1);
});
