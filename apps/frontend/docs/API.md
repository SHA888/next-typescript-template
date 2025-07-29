# API Documentation

## Base URL

All endpoints are prefixed with `/api`.

## Authentication

Most endpoints require authentication. Include the session token in cookies for authenticated requests.

### Authentication Flow

1. Get CSRF token: `GET /api/auth/csrf`
2. Login with credentials: `POST /api/auth/callback/credentials`
3. Use the session token in subsequent requests

## Response Format

### Success Response

```typescript
{
  data: T;          // Response data
  meta?: {          // Pagination info (if applicable)
    total: number;  // Total items
    page: number;   // Current page
    pageSize: number; // Items per page
    totalPages: number;
  };
}
```

### Error Response

```typescript
{
  error: string;    // Error message
  code?: string;    // Error code (optional)
}
```

## Authentication Endpoints

### Get CSRF Token

```http
GET /api/auth/csrf
```

**Response:**

```json
{
  "csrfToken": "e8fa059e0a0d477b75217ab19143c7227ce9af6fa40c12c26755246544be701f"
}
```

### Login

```http
POST /api/auth/callback/credentials
Content-Type: application/x-www-form-urlencoded

email=test@example.com&password=password123&redirect=false&csrfToken=<token>&json=true
```

**Response:**

```json
{
  "url": "http://localhost:3000"
}
```

### Logout

```http
POST /api/auth/signout
```

### Get Session

```http
GET /api/auth/session
```

**Response:**

```json
{
  "user": {
    "name": "Test User",
    "email": "test@example.com",
    "id": "cmdnlhib40000ux7usynrt3el",
    "role": "user"
  },
  "expires": "2025-08-27T21:03:48.000Z"
}
```

## User Management Endpoints

### Register New User

```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "securepassword123"
}
```

### List Users (Admin)

```http
GET /api/users?page=1&pageSize=10
```

### Get Current User Profile

```http
GET /api/users/me
```

### Update User

```http
PUT /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name"
}
```

## Protected Routes

### Test Protected Route

```http
GET /api/protected
```

**Response:**

```json
{
  "message": "This is a protected route",
  "user": {
    "name": "Test User",
    "email": "test@example.com",
    "id": "cmdnlhib40000ux7usynrt3el",
    "role": "user"
  }
}
```

## CORS Headers

- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`
- `Access-Control-Allow-Credentials: true`

## Error Status Codes

- 400: Bad Request - Invalid input data
- 401: Unauthorized - Authentication required or invalid credentials
- 403: Forbidden - Insufficient permissions
- 404: Not Found - Resource not found
- 409: Conflict - Resource already exists (e.g., duplicate email)
- 500: Server Error - Internal server error

## Rate Limiting

Authentication endpoints are rate-limited to prevent brute force attacks:

- 5 requests per minute per IP for login attempts
- 10 requests per minute per IP for other auth endpoints
