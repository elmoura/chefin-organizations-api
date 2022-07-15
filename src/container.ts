import 'reflect-metadata';
import { Container } from 'inversify';
import { usersModule } from '@modules/users/users.module';
import { databaseModule } from '@modules/database/database.module';
import { organizationsModule } from '@modules/organizations/organizations.module';
import {
  IOrganizationLocationDataSource,
  ORGANIZATION_LOCATION_DATASOURCE,
} from '@common/datasources/organizations/types/organization-location-datasource';
import { OrganizationLocationDataSource } from '@common/datasources/organizations/organization-location.datasource';
import { CryptoService } from '@common/services/crypto.service';
import { JwtService } from '@common/services/jwt.service';
import {
  ITokenService,
  TOKEN_SERVICE,
} from '@common/services/interfaces/token-service';
import {
  ICryptoService,
  CRYPTO_SERVICE,
} from '@common/services/interfaces/crypto-service';
import { UserDataSource } from './common/datasources/users/user.datasource';
import { OrganizationDataSource } from './common/datasources/organizations/organization.datasource';
import {
  IOrganizationDataSource,
  ORGANIZATION_DATASOURCE,
} from './common/datasources/organizations/types/organization-datasource.interface';
import {
  IUserDataSource,
  USER_DATASOURCE,
} from './common/datasources/users/types/user-datasouce.interface';

export const setupContainer = async (
  container = new Container()
): Promise<Container> => {
  await container.loadAsync(databaseModule);

  container.bind<ITokenService>(TOKEN_SERVICE).to(JwtService);

  container.bind<ICryptoService>(CRYPTO_SERVICE).to(CryptoService);

  container.bind<IUserDataSource>(USER_DATASOURCE).to(UserDataSource);

  container
    .bind<IOrganizationDataSource>(ORGANIZATION_DATASOURCE)
    .to(OrganizationDataSource);

  container
    .bind<IOrganizationLocationDataSource>(ORGANIZATION_LOCATION_DATASOURCE)
    .to(OrganizationLocationDataSource);

  container.load(usersModule);
  container.load(organizationsModule);

  return container;
};
