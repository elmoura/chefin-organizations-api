import { ContainerModule, interfaces } from 'inversify';
import {
  CreateUserUseCase,
  CREATE_USER_USE_CASE,
} from './core/create-user.usecase';
import {
  LoginUserUseCase,
  LOGIN_USER_USE_CASE,
} from './core/login-user.usecase';

export const usersModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CREATE_USER_USE_CASE).to(CreateUserUseCase);

  bind(LOGIN_USER_USE_CASE).to(LoginUserUseCase);
});
