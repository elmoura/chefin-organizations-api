import { AsyncContainerModule, interfaces } from 'inversify';
import { DataSource } from 'typeorm';
import { getDatabaseConnection } from './get-database-connection';

export const DATASOURCE_PROVIDER = 'MainDataSource';

export const databaseModule = new AsyncContainerModule(
  async (bind: interfaces.Bind) => {
    const datasource = await getDatabaseConnection();

    bind<DataSource>(DATASOURCE_PROVIDER).toConstantValue(datasource);
  }
);
