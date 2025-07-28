# API Documentation

## Base URL

All endpoints are prefixed with `/api`.

## Response Format

```typescript
{
  data: T;          // Response data
  meta?: {          // Pagination info
    total: number;  // Total items
    page: number;   // Current page
    pageSize: number; // Items per page
    totalPages: number;
  };
}
```

## Error Format

```typescript
{
  error: string;
}
```

## Endpoints

### Users

#### List Users

```http
GET /api/users?page=1&pageSize=10
```

#### Get User

```http
GET /api/users/:id
```

#### Create User

```http
POST /api/users
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### Update User

```http
PUT /api/users/:id
{
  "name": "John Updated"
}
```

#### Delete User

```http
DELETE /api/users/:id
```

## CORS Headers

- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`

## Error Status Codes

- 400: Bad Request
- 404: Not Found
- 409: Conflict (e.g., duplicate email)
- 500: Server Error
