import { BusinessError } from '@common/errors/business-error';

export class InvalidLoginError extends BusinessError {
  constructor(error?: any) {
    super('login inválido.', 400, error);
  }
}
