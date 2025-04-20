
// Configuration for AWS services
export const API_CONFIG = {
  apiGatewayUrl: import.meta.env.VITE_API_GATEWAY_URL || '',
};

export const DB_CONFIG = {
  username: import.meta.env.VITE_DB_USERNAME || '',
  password: import.meta.env.VITE_DB_PASSWORD || '',
  database: import.meta.env.VITE_DB_NAME || '',
  port: import.meta.env.VITE_DB_PORT || '3306',
  host: import.meta.env.VITE_DB_HOST || '',
};
