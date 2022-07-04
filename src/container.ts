import 'reflect-metadata';
import { Container } from 'inversify';
import { organizationsModule } from '@modules/organizations/organizations.module';
import { usersModule } from '@modules/users/users.module';
import { UserDataSource } from './common/datasources/users/user-user.datasource';
import { OrganizationDataSource } from './common/datasources/organizations/organization.datasource';
import {
  IOrganizationDataSource,
  ORGANIZATION_DATASOURCE_PROVIDER,
} from './common/datasources/organizations/types/organization-datasouce.interface';
import {
  IUserDataSource,
  USER_DATASOURCE_PROVIDER,
} from './common/datasources/users/types/user-datasouce.interface';
import { databaseModule } from './database/database.module';

const dependenciesContainer = new Container();

dependenciesContainer.loadAsync(databaseModule);

dependenciesContainer
  .bind<IUserDataSource>(USER_DATASOURCE_PROVIDER)
  .to(UserDataSource);

dependenciesContainer
  .bind<IOrganizationDataSource>(ORGANIZATION_DATASOURCE_PROVIDER)
  .to(OrganizationDataSource);

dependenciesContainer.load(usersModule);
dependenciesContainer.load(organizationsModule);

export { dependenciesContainer };
