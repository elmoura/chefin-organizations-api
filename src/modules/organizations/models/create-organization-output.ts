import { IOrganization } from '@common/entities/interfaces/organization';
import { IOrganizationLocation } from '@common/entities/interfaces/organization-location';
import { CreateUserOutput } from '@modules/users/models/create-user-output';

export class CreateOrganizationOutput implements IOrganization {
  id: string;

  name: string;

  organizationRepresentantId: string;

  businessSegment: string;

  user: CreateUserOutput;

  locations: IOrganizationLocation[];

  createdAt: Date;

  updatedAt: Date;
}
