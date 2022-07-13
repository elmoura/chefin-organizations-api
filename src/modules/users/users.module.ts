import { ContainerModule, interfaces } from 'inversify';
import {
  CreateUserUseCase,
  CREATE_USER_USE_CASE_PROVIDER,
} from './core/create-user.usecase';
import {
  LoginUserUseCase,
  LOGIN_USER_USE_CASE_PROVIDER,
} from './core/login-user.usecase';

export const usersModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CREATE_USER_USE_CASE_PROVIDER).to(CreateUserUseCase);

  bind(LOGIN_USER_USE_CASE_PROVIDER).to(LoginUserUseCase);
});
