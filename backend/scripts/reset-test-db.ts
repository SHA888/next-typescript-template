import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import * as dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

const prisma = new PrismaClient();

async function resetTestDatabase() {
  try {
    console.log('Resetting test database...');
    
    // Connect to the test database
    await prisma.$connect();
    
    // Drop all tables in the public schema
    console.log('Dropping existing tables...');
    
    try {
      // First, list all tables before dropping
      const tablesBefore = await prisma.$queryRaw`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `;
      console.log('Tables before drop:', tablesBefore);
      
      // Drop all tables individually to avoid permission issues
      await prisma.$executeRaw`
        DO $$
        DECLARE
            r RECORD;
        BEGIN
            -- Disable all triggers to avoid foreign key constraint issues
            SET session_replication_role = 'replica';
            
            -- Drop all tables
            FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
                EXECUTE 'DROP TABLE IF EXISTS public."' || r.tablename || '" CASCADE';
                RAISE NOTICE 'Dropped table: %', r.tablename;
            END LOOP;
            
            -- Re-enable triggers
            SET session_replication_role = 'origin';
        END $$;
      `;
      
      // Verify all tables were dropped
      const tablesAfter = await prisma.$queryRaw`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `;
      console.log('Tables after drop:', tablesAfter);
      
    } catch (error) {
      console.error('Error dropping tables:', error);
      throw error;
    }
    
    // Apply migrations
    console.log('Applying migrations...');
    
    try {
      // Run migrations
      execSync('npx prisma migrate deploy', {
        env: {
          ...process.env,
          NODE_ENV: 'test',
          DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/test_db?schema=public',
        },
        stdio: 'inherit',
      });
      
      // Verify migrations were applied
      const migrations = await prisma.$queryRaw`
        SELECT * FROM _prisma_migrations;
      `;
      console.log('Applied migrations:', migrations);
      
      // Check if users table exists
      const usersTable = await prisma.$queryRaw`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'users' AND table_schema = 'public';
      `;
      console.log('Users table structure:', usersTable);
      
      console.log('Migrations applied successfully');
    } catch (error) {
      console.error('Error applying migrations:', error);
      throw error;
    }
    
    console.log('Test database reset and migrations applied successfully!');
  } catch (error) {
    console.error('Error resetting test database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

resetTestDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
