/**
 * =====================================================
 * ENVIRONMENT CONFIGURATION EXAMPLE
 * =====================================================
 * 
 * This file shows the expected environment variables.
 * 
 * For Vite, create a .env.local file in the project root
 * with these variables (prefixed with VITE_):
 * 
 * VITE_API_URL=https://yourdomain.com/api
 * VITE_PAYMENTS_ENABLED=true
 * 
 * Access in code via: import.meta.env.VITE_API_URL
 */

// Type-safe environment access
export const ENV = {
  // API Base URL for PHP backend
  API_URL: import.meta.env.VITE_API_URL as string || 'https://postersready.com/api',
  
  // Enable/disable payment functionality
  PAYMENTS_ENABLED: import.meta.env.VITE_PAYMENTS_ENABLED === 'true',
  
  // App environment
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV,
} as const;

// Validate required environment variables
export function validateEnv(): void {
  const required = ['VITE_API_URL'];
  const missing = required.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0 && import.meta.env.PROD) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`);
  }
}
