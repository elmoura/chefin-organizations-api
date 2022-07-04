import { ContainerModule, interfaces } from 'inversify';
import {
  CreateOrganizationUseCase,
  CREATE_ORGANIZATION_USE_CASE_PROVIDER,
} from './core/create-organization.usecase';

export const organizationsModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind(CREATE_ORGANIZATION_USE_CASE_PROVIDER).to(CreateOrganizationUseCase);
  }
);
