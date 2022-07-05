import { join } from 'path';
import { DataSource } from 'typeorm';
import { configuration } from '../../config/vars';

const entitiesPattern = join(
  process.cwd(),
  '.build',
  '**',
  '**.entity.{ts,js}'
);

export const PostgresDataSource = new DataSource({
  logging: true,
  type: 'postgres',
  url: configuration.database.url,
  entities: [entitiesPattern],
});
