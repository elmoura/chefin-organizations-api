import { inject, injectable } from 'inversify';
import { IBaseUseCase } from '@common/utils/base-use-case';
import {
  IUserDataSource,
  USER_DATASOURCE,
} from '@common/datasources/users/types/user-datasouce.interface';

import {
  ITokenService,
  TOKEN_SERVICE,
} from '@common/services/interfaces/token-service';
import {
  ICryptoService,
  CRYPTO_SERVICE,
} from '@common/services/interfaces/crypto-service';
import { GenerateTokenInput } from '@common/services/dto/token-service';
import { InvalidLoginError } from './errors/invalid-login-error';
import { LoginUserInput } from '../models/login-user-input';
import { LoginUserOutput } from '../models/login-user.output';

export const LOGIN_USER_USE_CASE = 'LoginUserUseCase';

@injectable()
export class LoginUserUseCase
  implements IBaseUseCase<LoginUserInput, LoginUserOutput>
{
  constructor(
    @inject(TOKEN_SERVICE) private tokenService: ITokenService,
    @inject(CRYPTO_SERVICE) private cryptoService: ICryptoService,
    @inject(USER_DATASOURCE) public readonly userDataSource: IUserDataSource
  ) {}

  async execute(payload: LoginUserInput): Promise<LoginUserOutput> {
    const { email, password } = payload;
    const encryptedPasword = this.cryptoService.encrypt(password);

    const validLoginUser = await this.userDataSource.findByEmailAndPassword({
      email,
      password: encryptedPasword,
    });

    if (!validLoginUser) {
      throw new InvalidLoginError();
    }

    const tokenPayload: GenerateTokenInput = {
      userId: validLoginUser.userId,
      organizationId: validLoginUser.organizationId,
    };

    return this.tokenService.generateToken(tokenPayload);
  }
}
