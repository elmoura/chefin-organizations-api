import { join } from 'path';
import { DataSource } from 'typeorm';
import { configuration } from './src/config/vars';

const migrationsPattern = join(process.cwd(), 'migrations', '**.ts');
const entitiesPattern = join(process.cwd(), 'src', '**', '**.entity.ts');

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  url: configuration.database.url,
  entities: [entitiesPattern],
  migrations: [migrationsPattern],
});
