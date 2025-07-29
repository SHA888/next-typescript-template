# Next TypeScript Template (Monorepo)

> **Note**: This project was originally generated using [Lovable](https://lovable.dev), an AI-powered application development platform, and has been restructured as a monorepo.

This is a full-stack web application template built with Next.js, TypeScript, and Prisma ORM in 2025, organized as a monorepo using Turborepo. It integrates a Lovable-generated frontend (React 18, TypeScript, Tailwind CSS, shadcn/ui, ESLint) with a robust NestJS backend. The template uses Next.js's App Router for server-side rendering (SSR), static site generation (SSG), and API routes, ensuring performance, SEO, and type safety.

## Workspace Structure

```
next-typescript-template/
├── apps/
│   ├── frontend/         # Next.js frontend application
│   └── backend/          # NestJS backend application
├── packages/
│   ├── shared/           # Shared types and utilities
│   └── database/         # Prisma schema and client (optional)
├── package.json          # Root package.json with workspace config
└── turbo.json            # Turborepo configuration
```

## Why a Monorepo?

- **Shared Code**: Easily share types, utilities, and configurations between frontend and backend
- **Consistent Tooling**: Single lint, build, and test process for the entire project
- **Simplified Dependencies**: Manage all dependencies in one place
- **Atomic Changes**: Make changes across multiple packages with a single commit

## Features

- **Next.js 14+ (App Router)**: File-based routing, SSR, SSG, and server components for optimal performance and SEO.
- **TypeScript**: Full type safety across frontend and backend, reducing runtime errors.
- **Prisma ORM**: Type-safe database operations for PostgreSQL, MongoDB, or other supported databases.
- **Tailwind CSS**: Utility-first styling with custom design system support.
- **shadcn/ui**: Customizable, pre-built component library for professional UI design.
- **ESLint & Prettier**: Enforces code quality and consistent formatting.
- **Husky & lint-staged**: Automates linting and formatting on commits.
- **Hybrid Backend Option**: Supports a separate Node.js/Express backend with Prisma for complex logic (e.g., WebSockets, heavy computations).

## Prerequisites

- **Node.js**: Version 18.x or higher.
- **Package Manager**: npm, yarn, or pnpm (all supported).
- **Database**: PostgreSQL, MongoDB, or another Prisma-supported database.
- **Git**: For version control.

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd next-typescript-template
```

### 2. Install Dependencies

This project uses pnpm workspaces. Make sure you have pnpm installed:

```bash
npm install -g pnpm
```

Then install all dependencies:

```bash
pnpm install
```

### 3. Set Up Environment Variables

Copy the example environment files and update them with your configuration:

```bash
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env.local
```

### 4. Set Up the Database

Run database migrations and seed the database:

```bash
# From the root directory
pnpm db:push
pnpm db:generate
```

### 5. Start the Development Servers

To start both frontend and backend in development mode:

```bash
pnpm dev
```

This will start:
- Frontend at http://localhost:3000
- Backend at http://localhost:3001 (or your configured port)

## Available Scripts

From the root directory, you can run:

- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps for production
- `pnpm start` - Start all apps in production mode
- `pnpm lint` - Lint all apps
- `pnpm test` - Run tests for all apps
- `pnpm format` - Format all files with Prettier

To run a command for a specific app, use the `--filter` flag:

```bash
# Run tests only for the backend
pnpm --filter backend test

# Start only the frontend
pnpm --filter frontend dev
```
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
DATABASE_URL="your-database-connection-string"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

Replace `DATABASE_URL` with your database connection string (e.g., for PostgreSQL or MongoDB). For hybrid setups, update `NEXT_PUBLIC_API_URL` to point to the external backend.

### 4. Set Up Prisma

Initialize Prisma and generate the client:

```bash
npx prisma init
npx prisma generate
```

Update `/prisma/schema.prisma` to define your database models:

```prisma
model User {
  id    String  @id @default(uuid())
  name  String
  email String  @unique
}
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
next-typescript-template/
├── app/                    # Next.js App Router for pages and API routes
│   ├── api/                # API routes (e.g., /api/users)
│   ├── layout.tsx          # Root layout with shadcn/ui components
│   ├── page.tsx            # Home page
│   └── [...].tsx           # Dynamic routes and other pages
├── components/             # Reusable React components with shadcn/ui
├── lib/                    # Shared utilities and types
│   ├── types.ts            # Shared TypeScript interfaces
│   └── prisma.ts           # Prisma client instance
├── public/                 # Static assets (images, fonts, etc.)
├── styles/                 # Global styles and Tailwind configuration
├── prisma/                 # Prisma schema and migrations
├── .eslintrc.json          # ESLint configuration
├── .prettierrc             # Prettier configuration
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## Available Scripts

- `npm run dev` / `yarn dev`: Starts the development server.
- `npm run build` / `yarn build`: Builds the app for production.
- `npm run start` / `yarn start`: Runs the production build.
- `npm run lint` / `yarn lint`: Runs ESLint to check for code issues.
- `npm run format` / `yarn format`: Formats code with Prettier.
- `npm run prisma:migrate` / `yarn prisma:migrate`: Runs Prisma migrations.

## Best Practices

- **Type Safety**: Define shared interfaces in `/lib/types.ts` (e.g., `interface User { id: string; name: string; email: string; }`) for frontend and backend consistency.
- **API Routes**: Use type-safe API routes in `/app/api` with NextResponse and Prisma.
- **UI Components**: Use shadcn/ui with Tailwind CSS for reusable, accessible components. Customize in `tailwind.config.js`.
- **Database**: Use Prisma for type-safe queries. Run `npx prisma migrate dev` for schema changes.
- **Code Quality**: Enforce linting and formatting with ESLint, Prettier, and Husky.

## Example Usage

### Creating a Typed API Route

In `/app/api/users/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { User } from '@/lib/types';

export async function GET() {
  const users: User[] = await prisma.user.findMany();
  return NextResponse.json(users);
}
```

### Defining Shared Types

In `/lib/types.ts`:

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
}
```

### Creating a Page with shadcn/ui

In `/app/page.tsx`:

```tsx
import { Button } from '@/components/ui/button';
import { User } from '@/lib/types';

async function getUsers() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  return response.json();
}

export default async function Home() {
  const users: User[] = await getUsers();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Welcome to Next TypeScript Template</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="py-2">
            {user.name} <Button variant="outline">View Profile</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

## Optional Hybrid Approach

For complex backend logic (e.g., WebSockets, heavy computations), use a hybrid approach with Vercel hosting the Next.js app and a separate Node.js/Express backend with Prisma.

### Setup for Hybrid Approach

#### Frontend and Lightweight APIs on Vercel:
- Deploy the Next.js app to Vercel for SSR, SSG, and API routes
- Configure `NEXT_PUBLIC_API_URL` in Vercel's dashboard

#### Separate Backend Setup:

```

backend/
├── src/
│ ├── controllers/ # API logic (e.g., userController.ts)
│ ├── routes/ # Express routes (e.g., userRoutes.ts)
│ ├── types/ # Shared TypeScript types
│ └── index.ts # Entry point
├── prisma/
│ └── schema.prisma # Prisma schema
├── package.json
├── tsconfig.json
└── .env

````

Use the same `schema.prisma` and `/lib/types.ts` for consistency.

#### Integration:

1. Update `NEXT_PUBLIC_API_URL` to the backend (e.g., `https://your-backend.render.com`)
2. Fetch data in Next.js:

```typescript
// app/api/external-users/route.ts
import { NextResponse } from 'next/server';
import type { User } from '@/lib/types';

export async function GET() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  const users: User[] = await response.json();
  return NextResponse.json(users);
}
````

3. Backend route example (`/backend/src/routes/userRoutes.ts`):

```typescript
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { User } from '../types';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/users', async (req, res) => {
  const users: User[] = await prisma.user.findMany();
  res.json(users);
});

export default router;
```

#### Database Integration:

- Connect the backend to the same database using Prisma
- Share `schema.prisma` and type definitions

#### Deployment:

- Deploy Next.js to Vercel (see "Deployment" section)
- Deploy the backend to Render:
  1. Push backend code to a Git repository
  2. Create a Web Service in Render, set `DATABASE_URL`, and configure CORS

### When to Use the Hybrid Approach

- **Complex Logic**: For WebSockets (e.g., real-time chat), long-running processes, or compute-intensive tasks
- **Custom Server Needs**: When Vercel's serverless limits are insufficient
- **Advanced Database Needs**: For complex migrations or queries

### Best Practices for Hybrid Approach

- **Shared Types**: Use a shared `types.ts` via a monorepo or npm package
- **API Contracts**: Use Zod or tRPC for type safety
- **Security**: Configure CORS and authentication (e.g., JWT)
- **Monitoring**: Use Vercel analytics and Render logs

## Swappable Components and Versatility

The template is modular, allowing swaps for Prisma, Tailwind CSS, shadcn/ui, or the backend framework.

### Swapping the ORM

**From Prisma to TypeORM or Drizzle:**

#### Replace Prisma with TypeORM:

1. Install TypeORM and a database driver (e.g., `pg` for PostgreSQL)
2. Create TypeORM entities in `/src/entities`
3. Set up a database connection in `/lib/db.ts`

#### Or use Drizzle:

1. Install Drizzle and a database driver
2. Define schema in `/lib/db/schema.ts`
3. Use Drizzle's query builder for type-safe queries

### Swapping Styling

**From Tailwind CSS to CSS Modules or Styled Components:**

#### For CSS Modules:

1. Rename `.css` files to `.module.css`
2. Import styles directly in components

#### For Styled Components:

1. Install `styled-components` and `@types/styled-components`
2. Create styled components in your React files

### Swapping UI Library

**From shadcn/ui to MUI or Chakra UI:**

#### For MUI:

1. Install `@mui/material` and `@emotion/styled`
2. Replace shadcn/ui components with MUI equivalents

### Swapping Styling (Continued)

#### For Chakra UI:

1. Install `@chakra-ui/react` and its dependencies
2. Use Chakra's component library and theme system

#### For Emotion:

1. Install `@emotion/react` and `@emotion/styled`
2. Usage is similar to Styled-Components
   ```bash
   npm install @emotion/react @emotion/styled
   ```

### Swapping Authentication

**From NextAuth.js to Clerk or Supabase Auth:**

#### For Clerk:

1. Install required packages:
   ```bash
   npm install @clerk/nextjs
   ```
2. Set up environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
   CLERK_SECRET_KEY=your_secret_key
   ```
3. Update `middleware.ts` for protected routes
4. Use Clerk's hooks in your components:

   ```tsx
   import { UserButton } from '@clerk/nextjs';

   export default function Home() {
     return (
       <div>
         <UserButton afterSignOutUrl="/" />
         {/* Your app content */}
       </div>
     );
   }
   ```

#### For Supabase Auth:

1. Install required packages:
   ```bash
   npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
   ```
2. Set up environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```
3. Create a Supabase client utility (`lib/supabase.ts`):

   ```typescript
   import { createClient } from '@supabase/supabase-js';

   export const supabase = createClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL!,
     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
   );
   ```

4. Example authentication API route (`app/api/auth/login/route.ts`):

   ```typescript
   import { NextResponse } from 'next/server';
   import { supabase } from '@/lib/supabase';
   import { prisma } from '@/lib/prisma';
   import type { User } from '@/lib/types';

   export async function POST(request: Request) {
     const { email, password } = await request.json();
     const { data, error } = await supabase.auth.signInWithPassword({ email, password });

     if (error) {
       return NextResponse.json({ error: error.message }, { status: 400 });
     }

     // Create or update user in your database
     const user = await prisma.user.upsert({
       where: { id: data.user.id },
       update: { email, name: data.user.user_metadata?.name },
       create: {
         id: data.user.id,
         email,
         name: data.user.user_metadata?.name || email.split('@')[0],
       },
     });

     return NextResponse.json(user);
   }
   ```

### Swapping Backend Framework

**From Express to NestJS or Fastify:**

#### For NestJS:

NestJS is a progressive Node.js framework for building efficient, reliable and scalable server-side applications. Here's how to set it up as your backend:

1. **Install NestJS CLI and create a new project**:

   ```bash
   npm install -g @nestjs/cli
   nest new backend
   cd backend
   ```

2. **Install required dependencies**:

   ```bash
   npm install @prisma/client @nestjs/config @nestjs/swagger class-validator class-transformer
   npm install -D prisma
   ```

3. **Set up Prisma**:

   ```bash
   npx prisma init
   # Update the DATABASE_URL in .env to match your database
   ```

4. **Create a Prisma service** (`src/prisma/prisma.service.ts`):

   ```typescript
   import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
   import { PrismaClient } from '@prisma/client';

   @Injectable()
   export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
     async onModuleInit() {
       await this.$connect();
     }

     async onModuleDestroy() {
       await this.$disconnect();
     }
   }
   ```

5. **Create a Prisma module** (`src/prisma/prisma.module.ts`):

   ```typescript
   import { Global, Module } from '@nestjs/common';
   import { PrismaService } from './prisma.service';

   @Global()
   @Module({
     providers: [PrismaService],
     exports: [PrismaService],
   })
   export class PrismaModule {}
   ```

6. **Create a users module** (`src/users/users.module.ts`):

   ```typescript
   import { Module } from '@nestjs/common';
   import { UsersController } from './users.controller';
   import { UsersService } from './users.service';
   import { PrismaModule } from '../prisma/prisma.module';

   @Module({
     imports: [PrismaModule],
     controllers: [UsersController],
     providers: [UsersService],
     exports: [UsersService],
   })
   export class UsersModule {}
   ```

7. **Create a users service** (`src/users/users.service.ts`):

   ```typescript
   import { Injectable } from '@nestjs/common';
   import { PrismaService } from '../prisma/prisma.service';
   import { User } from '@prisma/client';

   @Injectable()
   export class UsersService {
     constructor(private prisma: PrismaService) {}

     async findAll(): Promise<User[]> {
       return this.prisma.user.findMany();
     }

     async findOne(id: string): Promise<User | null> {
       return this.prisma.user.findUnique({ where: { id } });
     }
   }
   ```

8. **Create a users controller** (`src/users/users.controller.ts`):

   ```typescript
   import { Controller, Get, Param } from '@nestjs/common';
   import { UsersService } from './users.service';
   import { User } from '@prisma/client';

   @Controller('api/users')
   export class UsersController {
     constructor(private readonly usersService: UsersService) {}

     @Get()
     async findAll(): Promise<User[]> {
       return this.usersService.findAll();
     }

     @Get(':id')
     async findOne(@Param('id') id: string): Promise<User | null> {
       return this.usersService.findOne(id);
     }
   }
   ```

9. **Update the main app module** (`src/app.module.ts`):

   ```typescript
   import { Module } from '@nestjs/common';
   import { ConfigModule } from '@nestjs/config';
   import { PrismaModule } from './prisma/prisma.module';
   import { UsersModule } from './users/users.module';

   @Module({
     imports: [
       ConfigModule.forRoot({
         isGlobal: true,
       }),
       PrismaModule,
       UsersModule,
     ],
   })
   export class AppModule {}
   ```

10. **Update the main.ts file** (`src/main.ts`):

    ```typescript
    import { NestFactory } from '@nestjs/core';
    import { AppModule } from './app.module';
    import { ValidationPipe } from '@nestjs/common';
    import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

    async function bootstrap() {
      const app = await NestFactory.create(AppModule);

      // Enable CORS for development
      app.enableCors();

      // Global validation pipe
      app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

      // Swagger documentation
      const config = new DocumentBuilder()
        .setTitle('NestJS API')
        .setDescription('API documentation')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api/docs', app, document);

      await app.listen(3001);
      console.log(`Application is running on: http://localhost:3001`);
      console.log(`Swagger docs available at: http://localhost:3001/api/docs`);
    }

    bootstrap();
    ```

11. **Update your Next.js frontend** to point to the NestJS backend by setting the environment variable in `.env.local`:

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3001/api
    ```

12. **Start the NestJS server**:

    ```bash
    # In development mode with hot-reload
    npm run start:dev

    # Or for production
    npm run build
    npm run start:prod
    ```

**Key Benefits of Using NestJS:**

- Built-in dependency injection
- Modular architecture
- Excellent TypeScript support
- Strong ecosystem with many built-in modules
- Enterprise-ready with extensive documentation
- Great for large-scale applications

**Note**: Make sure to configure CORS in your NestJS application to allow requests from your Next.js frontend domain in production.

#### For Fastify:

1. Install required packages:
   ```bash
   npm install fastify @fastify/cors @fastify/helmet
   ```
2. Set up your Fastify server (`server/index.ts`):

   ```typescript
   import Fastify from 'fastify';
   import cors from '@fastify/cors';
   import helmet from '@fastify/helmet';
   import { PrismaClient } from '@prisma/client';

   const prisma = new PrismaClient();
   const app = Fastify({ logger: true });

   // Register plugins
   await app.register(cors, { origin: process.env.CLIENT_URL });
   await app.register(helmet);

   // Example route
   app.get('/api/users', async (request, reply) => {
     const users = await prisma.user.findMany();
     return users;
   });

   // Start server
   const start = async () => {
     try {
       await app.listen({ port: 3001, host: '0.0.0.0' });
       console.log('Server running on port 3001');
     } catch (err) {
       app.log.error(err);
       process.exit(1);
     }
   };

   start();
   ```

#### For NestJS:

1. Install the NestJS CLI and create a new project:
   ```bash
   npm i -g @nestjs/cli
   nest new backend
   cd backend
   ```
2. Install required dependencies:
   ```bash
   npm install @prisma/client @nestjs/config
   npm install -D prisma
   ```
3. Set up your Prisma module and service:

   ```typescript
   // src/prisma/prisma.module.ts
   import { Module } from '@nestjs/common';
   import { PrismaService } from './prisma.service';

   @Module({
     providers: [PrismaService],
     exports: [PrismaService],
   })
   export class PrismaModule {}

   // src/prisma/prisma.service.ts
   import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
   import { PrismaClient } from '@prisma/client';

   @Injectable()
   export class PrismaService extends PrismaClient implements OnModuleInit {
     async onModuleInit() {
       await this.$connect();
     }

     async enableShutdownHooks(app: INestApplication) {
       this.$on('beforeExit', async () => {
         await app.close();
       });
     }
   }
   ```

4. Create a users module and controller:

   ```typescript
   // src/users/users.controller.ts
   import { Controller, Get } from '@nestjs/common';
   import { PrismaService } from '../prisma/prisma.service';

   @Controller('users')
   export class UsersController {
     constructor(private prisma: PrismaService) {}

     @Get()
     async getUsers() {
       return this.prisma.user.findMany();
     }
   }

   // src/users/users.module.ts
   import { Module } from '@nestjs/common';
   import { UsersController } from './users.controller';
   import { PrismaModule } from '../prisma/prisma.module';

   @Module({
     imports: [PrismaModule],
     controllers: [UsersController],
   })
   export class UsersModule {}
   ```

5. Update your main app module:

   ```typescript
   // src/app.module.ts
   import { Module } from '@nestjs/common';
   import { ConfigModule } from '@nestjs/config';
   import { UsersModule } from './users/users.module';
   import { PrismaModule } from './prisma/prisma.module';

   @Module({
     imports: [ConfigModule.forRoot(), PrismaModule, UsersModule],
   })
   export class AppModule {}
   ```

6. Start the server:
   ```bash
   npm run start:dev
   ```

## Best Practices for Swappable Components

When swapping components in this template, keep these best practices in mind:

- **Type Safety**: Ensure all alternatives support TypeScript for consistent type checking
- **Dependency Management**: Always update `package.json` and run `npm install` or `yarn install` after making changes
- **Testing**: Test all API routes and components after swapping dependencies
  ```bash
  # Run tests
  npm test
  # or
  yarn test
  ```
- **Documentation**: Update relevant documentation when making significant changes
- **Version Control**: Commit changes frequently with descriptive messages

## Deployment

### Deploying to Vercel (Frontend)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your repository to Vercel
3. Configure environment variables in the Vercel dashboard:
   - `DATABASE_URL`: Your database connection string
   - `NEXT_PUBLIC_API_URL`: Your API URL (e.g., `https://your-api.vercel.app/api` for serverless functions)
4. Deploy your application

### Hybrid Deployment (Frontend + Backend)

1. **Frontend on Vercel**:
   - Deploy the Next.js app to Vercel as described above
   - Set `NEXT_PUBLIC_API_URL` to your backend URL

2. **Backend on Render** (or alternative):
   - Push your backend code to a Git repository
   - Create a new Web Service in Render
   - Configure environment variables:
     - `DATABASE_URL`: Your database connection string
     - `NODE_ENV`: Set to `production`
     - Any other required environment variables
   - Set the build command (e.g., `npm run build`)
   - Set the start command (e.g., `npm start`)
   - Configure CORS to allow requests from your Vercel domain

## Contributing

We welcome contributions to improve this template! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

This project was made possible thanks to:

- [Lovable](https://lovable.dev) - For the initial project generation and setup
- The entire open-source community for their invaluable contributions to the technologies used in this template

## Resources

### Core Technologies

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)

### Deployment

- [Vercel Deployment Guide](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)

### Additional Resources

- [React Documentation](https://react.dev/learn)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express Documentation](https://expressjs.com/)
- [NestJS Documentation](https://docs.nestjs.com/)
