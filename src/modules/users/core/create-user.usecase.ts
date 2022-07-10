import { inject, injectable } from 'inversify';
import { IBaseUseCase } from '@common/utils/base-use-case';
import {
  IUserDataSource,
  USER_DATASOURCE_PROVIDER,
} from '@common/datasources/users/types/user-datasouce.interface';
import {
  IOrganizationDataSource,
  ORGANIZATION_DATASOURCE_PROVIDER,
} from '@common/datasources/organizations/types/organization-datasource.interface';
import { InvalidOrganizationError } from '@common/errors/invalid-organization-error';
import { CreateUserInput } from '../models/create-user-input';
import { CreateUserOutput } from '../models/create-user-output';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

export const CREATE_USER_USE_CASE_PROVIDER = 'CreateUserUseCase';

@injectable()
export class CreateUserUseCase
  implements IBaseUseCase<CreateUserInput, CreateUserOutput>
{
  constructor(
    @inject(USER_DATASOURCE_PROVIDER)
    public readonly userDataSource: IUserDataSource,
    @inject(ORGANIZATION_DATASOURCE_PROVIDER)
    public readonly organizationDataSource: IOrganizationDataSource
  ) {}

  async execute(createUserInput: CreateUserInput): Promise<CreateUserOutput> {
    const { email, organizationId } = createUserInput;

    const organizationExists = await this.organizationDataSource.findById(
      organizationId
    );

    if (!organizationExists) {
      throw new InvalidOrganizationError();
    }

    const userAlreadyExists = await this.userDataSource.findByEmail(email);

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const createdUser = await this.userDataSource.createOne(createUserInput);

    return createdUser;
  }
}
