import 'dotenv/config';

export const configuration = {
  appPort: Number(process.env.APP_PORT) || 3000,
  database: {
    url: process.env.DB_URL || '',
  },
  crypto: {
    secretKey: process.env.CRYPT_SECRET_KEY || '',
    initializationVector: process.env.CRYPT_IV || '',
  },
};
