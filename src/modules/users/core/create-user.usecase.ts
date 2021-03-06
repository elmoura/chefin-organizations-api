import { inject, injectable } from 'inversify';
import { IBaseUseCase } from '@common/utils/base-use-case';
import {
  IUserDataSource,
  USER_DATASOURCE,
} from '@common/datasources/users/types/user-datasouce.interface';
import {
  IOrganizationDataSource,
  ORGANIZATION_DATASOURCE,
} from '@common/datasources/organizations/types/organization-datasource.interface';
import { InvalidOrganizationError } from '@common/errors/invalid-organization-error';
import {
  CRYPTO_SERVICE,
  ICryptoService,
} from '@common/services/interfaces/crypto-service';
import { IUser } from '@common/entities/interfaces/user';
import {
  ITokenService,
  TOKEN_SERVICE,
} from '@common/services/interfaces/token-service';
import { GenerateTokenInput } from '@common/services/dto/token-service';
import { CreateUserInput } from '../models/create-user-input';
import { CreateUserOutput } from '../models/create-user-output';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

export const CREATE_USER_USE_CASE = 'CreateUserUseCase';

@injectable()
export class CreateUserUseCase
  implements IBaseUseCase<CreateUserInput, CreateUserOutput>
{
  constructor(
    @inject(TOKEN_SERVICE)
    public readonly tokenService: ITokenService,
    @inject(CRYPTO_SERVICE)
    private readonly cryptoService: ICryptoService,
    @inject(USER_DATASOURCE)
    public readonly userDataSource: IUserDataSource,
    @inject(ORGANIZATION_DATASOURCE)
    public readonly organizationDataSource: IOrganizationDataSource
  ) {}

  async execute(createUserInput: CreateUserInput): Promise<CreateUserOutput> {
    const { organizationId, email, password } = createUserInput;

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

    const createdUser = await this.userDataSource.createOne({
      ...createUserInput,
      password: this.cryptoService.encrypt(password),
    });

    const treatedUser: IUser = {
      ...createdUser,
      password: undefined!,
    };

    const tokenPayload: GenerateTokenInput = {
      userId: createdUser.userId,
      organizationId: createdUser.organizationId,
    };

    const { accessToken } = this.tokenService.generateToken(tokenPayload);

    return {
      auth: { accessToken },
      ...treatedUser,
    };
  }
}
