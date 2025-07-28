/**
 * Shared TypeScript type definitions for the application.
 * These types are used across both frontend and backend for type safety.
 */

// User type that matches our Prisma model
export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Example of a generic API response type
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

// Example of a paginated response
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

// Example of a pagination query
export interface PaginationQuery {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Example of a search query
export interface SearchQuery extends PaginationQuery {
  query?: string;
  filters?: Record<string, unknown>;
}

// Example of an error response
export interface ErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
  timestamp?: string;
  path?: string;
}

// Example of authentication related types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  name: string;
  // Add any additional registration fields here
}

// Example of a file upload response
export interface FileUploadResponse {
  url: string;
  key: string;
  name: string;
  size: number;
  mimeType: string;
}
