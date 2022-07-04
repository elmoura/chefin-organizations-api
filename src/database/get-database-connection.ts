import { DataSource } from 'typeorm';
import PostgresDataSource from './postgres-datasource';

export const getDatabaseConnection = async (): Promise<DataSource> => {
  const alreadyConnected = PostgresDataSource.isInitialized;

  if (alreadyConnected) {
    console.log('a db connection already exists, reusing existing connection');
    return PostgresDataSource;
  }

  await PostgresDataSource.initialize();
  console.log('created new database connection');

  return PostgresDataSource;
};
