// This file provides consistent configuration for test environment
// Note: This file should be committed to version control
// Sensitive values should be provided via environment variables or .env.test file

/**
 * Test configuration object
 * Default values are for local development only
 * Override in production/test environments using environment variables
 */
export const TEST_CONFIG = {
  // JWT Configuration - should match your JWT strategy
  JWT: {
    // In CI/CD, provide TEST_JWT_SECRET environment variable
    SECRET: process.env.TEST_JWT_SECRET || 'test-secret-key-only-for-local-dev',
    // In CI/CD, provide TEST_JWT_EXPIRES_IN environment variable
    EXPIRES_IN: process.env.TEST_JWT_EXPIRES_IN || '1d',
  },

  // Database Configuration
  DATABASE: {
    // Always provide TEST_DATABASE_URL in CI/CD
    URL: process.env.TEST_DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/test_db',
  },

  // Application Configuration
  APP: {
    PORT: parseInt(process.env.TEST_APP_PORT || '3001', 10),
    NODE_ENV: 'test',
  },
} as const;

// Set environment variables for tests
function setTestEnvironment() {
  // Only set if not already set by environment
  if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = TEST_CONFIG.JWT.SECRET;
  }
  
  if (!process.env.JWT_EXPIRES_IN) {
    process.env.JWT_EXPIRES_IN = TEST_CONFIG.JWT.EXPIRES_IN;
  }
  
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = TEST_CONFIG.APP.NODE_ENV;
  }
}

// Initialize environment variables when this module is imported
setTestEnvironment();

// Export the configuration for use in tests
export default TEST_CONFIG;
