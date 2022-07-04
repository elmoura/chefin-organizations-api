import 'dotenv/config';

export const configuration = {
  appPort: Number(process.env.APP_PORT) || 3000,
  database: {
    url: process.env.DB_URL,
  },
};
