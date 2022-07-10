import { BusinessError } from '@common/errors/business-error';

export class UserAlreadyExistsError extends BusinessError {
  constructor(error?: any) {
    super('já existe um usuário com esse e-mail.', 400, error);
  }
}
