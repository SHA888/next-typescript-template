# Utility Scripts

This document describes the utility scripts available in the project for development and testing purposes.

## Database Scripts

### 1. Database Connection Tests

#### `scripts/test-db.ts`

**Purpose**: Test database connection and list all tables.

**Usage**:

```bash
tsx scripts/test-db.ts
```

**Output**:

```
Testing database connection...
Database connection successful! [ { test: 1 } ]
```

#### `scripts/raw-db-test.mjs`

**Purpose**: Test raw PostgreSQL connection using `pg` client.

**Usage**:

```bash
node scripts/raw-db-test.mjs
```

### 2. Prisma Testing

#### `scripts/test-prisma.js`

**Purpose**: Test Prisma client functionality with detailed logging.

**Usage**:

```bash
node scripts/test-prisma.js
```

#### `scripts/verify-db.ts`

**Purpose**: Verify database schema and connection using Prisma.

**Usage**:

```bash
tsx scripts/verify-db.ts
```

## Authentication Scripts

### 1. Test User Management

#### `scripts/cleanup-and-register.js`

**Purpose**: Clean up existing test user and create a new one with proper password hashing.

**Usage**:

```bash
node scripts/cleanup-and-register.js
```

**Actions**:

1. Deletes the test user if it exists
2. Creates a new test user with email `test@example.com` and password `password123`
3. Verifies the password hash is correct

**Output**:

```
Checking for existing test user...
Deleting existing test user...
Test user deleted successfully

Creating new test user...
Name: Test User
Email: test@example.com
Password: password123

Test user created successfully:
{
  "id": "cmdnlhib40000ux7usynrt3el",
  "email": "test@example.com",
  "name": "Test User",
  "role": "user"
}

Password verification: SUCCESS
Password hash: $2b$10$n2N.Tv7wp6G17LaaM1RFI.k9M4G5ET9xGOpxXTUav5rTpeNKZ5ZeK
```

#### `scripts/register-test-user.js`

**Purpose**: Register a test user via the API.

**Usage**:

```bash
node scripts/register-test-user.js
```

#### `scripts/test-signup.js`

**Purpose**: Test the user signup flow.

**Usage**:

```bash
node scripts/test-signup.js
```

### 2. Password Verification Test

#### `scripts/test-password.js`

**Purpose**: Test password hashing and verification for an existing user.

**Usage**:

```bash
node scripts/test-password.js
```

**Actions**:

1. Retrieves the test user from the database
2. Tests password verification
3. If verification fails, generates a new hash for comparison

**Output**:

```
Testing password for user: test@example.com
Testing password: password123
Stored hash: $2b$10$n2N...
Password match: true
```

#### `scripts/check-user.js`

**Purpose**: Check if a user exists in the database and view their details.

**Usage**:

```bash
node scripts/check-user.js
```

**Output**:

```
User found:
{
  id: 'cmdmwvfkw0000uxqm1ptyhisw',
  email: 'test@example.com',
  role: 'user',
  hasPassword: true,
  passwordHash: '$2b$10$n2N...'
}
```

## Asset Generation

### Favicon Generation

There are two favicon generation scripts available:

#### `scripts/generate-favicons.ts` (Recommended)

**Purpose**: Generate favicon files in different sizes using `sharp` (TypeScript implementation).

**Prerequisites**:

```bash
npm install sharp
```

**Usage**:

```bash
tsx scripts/generate-favicons.ts
```

**Output**:

- Generates favicon files in `public/` directory
- Multiple sizes for different devices
- Uses modern TypeScript and `sharp` for better performance

#### `scripts/generate-favicons.js` (Legacy)

**Purpose**: Alternative favicon generation using `favicon-generator` (JavaScript implementation).

**Prerequisites**:

```bash
npm install favicon-generator
```

**Usage**:

```bash
node scripts/generate-favicons.js
```

**Note**: This is the legacy implementation. The TypeScript version above is recommended for new projects.

## Development Workflow

### Running Tests

1. Start the development server:

   ```bash
   npm run dev
   ```

2. In a new terminal, run the desired script:

   ```bash
   node scripts/cleanup-and-register.js
   ```

3. Test authentication flow:

   ```bash
   # Get CSRF token
   curl -v -c cookies.txt http://localhost:3000/api/auth/csrf

   # Login
   curl -v -b cookies.txt -c cookies.txt -X POST http://localhost:3000/api/auth/callback/credentials \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "email=test@example.com&password=password123&redirect=false&csrfToken=<token>&json=true"

   # Test protected route
   curl -v -b cookies.txt http://localhost:3000/api/protected
   ```

## Notes

> **Warning:**
> These scripts are intended for development and testing purposes only.
> Always ensure you have the latest dependencies installed (`npm install`).
> Some scripts may require environment variables to be set (e.g., database connection).
> Be cautious when running scripts that modify the database in production environments.
> TypeScript scripts require `tsx` for execution (`npm install -g tsx`).
