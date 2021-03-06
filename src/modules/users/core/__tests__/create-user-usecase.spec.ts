import { Container } from 'inversify';
import { ORGANIZATION_DATASOURCE } from '@common/datasources/organizations/types/organization-datasource.interface';
import {
  IUserDataSource,
  USER_DATASOURCE,
} from '@common/datasources/users/types/user-datasouce.interface';
import { UserDataSource } from '@common/datasources/users/user.datasource';
import { OrganizationDataSource } from '@common/datasources/organizations/organization.datasource';
import { CreateUserInput } from '@modules/users/models/create-user-input';
import { InvalidOrganizationError } from '@common/errors/invalid-organization-error';
import {
  CRYPTO_SERVICE,
  ICryptoService,
} from '@common/services/interfaces/crypto-service';
import { CryptoService } from '@common/services/crypto.service';
import {
  ITokenService,
  TOKEN_SERVICE,
} from '@common/services/interfaces/token-service';
import { JwtService } from '@common/services/jwt.service';
import {
  CreateUserUseCase,
  CREATE_USER_USE_CASE,
} from '../create-user.usecase';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';

jest.mock('@common/datasources/users/user.datasource');
jest.mock('@common/datasources/organizations/organization.datasource');

describe(CreateUserUseCase.name, () => {
  let createUserUseCase: CreateUserUseCase;

  beforeAll(() => {
    const testContainer = new Container();

    testContainer.bind<ITokenService>(TOKEN_SERVICE).to(JwtService);

    testContainer.bind<ICryptoService>(CRYPTO_SERVICE).to(CryptoService);

    testContainer.bind<IUserDataSource>(USER_DATASOURCE).to(UserDataSource);

    testContainer.bind(ORGANIZATION_DATASOURCE).to(OrganizationDataSource);

    testContainer.bind(CREATE_USER_USE_CASE).to(CreateUserUseCase);

    createUserUseCase = testContainer.get(CREATE_USER_USE_CASE);
  });

  const createUserInput: CreateUserInput = {
    organizationId: 'uuid-muito-louco',
    email: 'teste@email.com',
    firstName: 'Teste',
    lastName: 'da Silva Jr.',
    password: 'torcidajovemporraaaaa',
    phoneNumber: '13999999999zap',
  };

  describe('.execute', () => {
    test('creates an user successfully', async () => {
      jest
        .spyOn(createUserUseCase.userDataSource, 'findByEmail')
        .mockImplementationOnce(async () => null);

      const result = await createUserUseCase.execute(createUserInput);

      expect(result.userId).toBeTruthy();
      expect(result.auth.accessToken).toBeTruthy();
    });

    describe(`throws a ${UserAlreadyExistsError.name} instance`, () => {
      test('when passed an email already registered', async () => {
        try {
          await createUserUseCase.execute(createUserInput);
        } catch (error) {
          expect(error instanceof UserAlreadyExistsError).toEqual(true);
          expect(error.statusCode).toBe(400);
          expect(error.message[0]).toBeTruthy();
        }
      });
    });

    describe(`throws a ${InvalidOrganizationError.name} instance`, () => {
      const invalidOrganizationError = new InvalidOrganizationError();

      test('when passed organizationId does not exist', async () => {
        jest
          .spyOn(createUserUseCase.organizationDataSource, 'findById')
          .mockImplementationOnce(async () => null);

        try {
          await createUserUseCase.execute(createUserInput);
        } catch (error) {
          expect(error instanceof InvalidOrganizationError).toEqual(true);
          expect(error.statusCode).toBe(invalidOrganizationError.statusCode);
          expect(error.message).toBe(invalidOrganizationError.message);
        }
      });
    });
  });
});
