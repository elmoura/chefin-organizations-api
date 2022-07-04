import { join } from 'path';
import { DataSource } from 'typeorm';
import { configuration } from '../config/vars';

console.log(process.cwd());

const PostgresDataSource = new DataSource({
  logging: true,
  type: 'postgres',
  url: configuration.database.url,
  entities: [join(process.cwd(), 'src', '**', '**.entity.ts')],
  migrations: [join(process.cwd(), 'src', 'database', 'migrations', '**.ts')],
})
  .initialize()
  .then(() => console.log('connected to postgress'));

export default PostgresDataSource;
