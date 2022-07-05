import 'reflect-metadata';
import { Container } from 'inversify';
import { usersModule } from '@modules/users/users.module';
import { databaseModule } from '@modules/database/database.module';
import { organizationsModule } from '@modules/organizations/organizations.module';
import {
  IOrganizationLocationDataSource,
  ORGANIZATION_LOCATION_DATASOURCE_PROVIDER,
} from '@common/datasources/organizations/types/organization-location-datasource';
import { OrganizationLocationDataSource } from '@common/datasources/organizations/organization-location.datasource';
import { UserDataSource } from './common/datasources/users/user-user.datasource';
import { OrganizationDataSource } from './common/datasources/organizations/organization.datasource';
import {
  IOrganizationDataSource,
  ORGANIZATION_DATASOURCE_PROVIDER,
} from './common/datasources/organizations/types/organization-datasource.interface';
import {
  IUserDataSource,
  USER_DATASOURCE_PROVIDER,
} from './common/datasources/users/types/user-datasouce.interface';

export const setupContainer = async (
  container = new Container()
): Promise<Container> => {
  await container.loadAsync(databaseModule);

  container.bind<IUserDataSource>(USER_DATASOURCE_PROVIDER).to(UserDataSource);

  container
    .bind<IOrganizationDataSource>(ORGANIZATION_DATASOURCE_PROVIDER)
    .to(OrganizationDataSource);

  container
    .bind<IOrganizationLocationDataSource>(
      ORGANIZATION_LOCATION_DATASOURCE_PROVIDER
    )
    .to(OrganizationLocationDataSource);

  container.load(usersModule);
  container.load(organizationsModule);

  return container;
};
