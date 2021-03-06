import { Container } from 'inversify';
import {
  IUserDataSource,
  USER_DATASOURCE,
} from '@common/datasources/users/types/user-datasouce.interface';
import { CryptoService } from '@common/services/crypto.service';
import { UserDataSource } from '@common/datasources/users/user.datasource';
import {
  ICryptoService,
  CRYPTO_SERVICE,
} from '@common/services/interfaces/crypto-service';
import {
  ITokenService,
  TOKEN_SERVICE,
} from '@common/services/interfaces/token-service';
import { JwtService } from '@common/services/jwt.service';
import { LoginUserInput } from '@modules/users/models/login-user-input';
import { LoginUserUseCase, LOGIN_USER_USE_CASE } from '../login-user.usecase';
import { InvalidLoginError } from '../errors/invalid-login-error';

jest.mock('@common/datasources/users/user.datasource');

describe('Login user use case', () => {
  let userDataSource: IUserDataSource;
  let loginUserUseCase: LoginUserUseCase;

  beforeAll(() => {
    const testContainer = new Container();

    testContainer.bind<ITokenService>(TOKEN_SERVICE).to(JwtService);

    testContainer.bind<ICryptoService>(CRYPTO_SERVICE).to(CryptoService);

    testContainer.bind<IUserDataSource>(USER_DATASOURCE).to(UserDataSource);

    testContainer.bind(LOGIN_USER_USE_CASE).to(LoginUserUseCase);

    userDataSource = testContainer.get(USER_DATASOURCE);
    loginUserUseCase = testContainer.get(LOGIN_USER_USE_CASE);
  });

  const loginUserInput: LoginUserInput = {
    email: 'mock@email.com',
    password: 'mocked_password',
  };

  test('login an user successfully', async () => {
    const result = await loginUserUseCase.execute(loginUserInput);

    expect(result.accessToken).toBeTruthy();
  });

  describe(`throws ${InvalidLoginError.name}`, () => {
    const invalidLoginError = new InvalidLoginError();

    test('when the email and password dont match any user', async () => {
      jest
        .spyOn(loginUserUseCase.userDataSource, 'findByEmailAndPassword')
        .mockImplementationOnce(async () => null);

      try {
        await loginUserUseCase.execute(loginUserInput);
      } catch (error) {
        expect(error instanceof InvalidLoginError).toBe(true);
        expect(error.statusCode).toBe(invalidLoginError.statusCode);
        expect(error.message).toBe(invalidLoginError.message);
      }
    });
  });
});
