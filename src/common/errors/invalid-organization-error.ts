import { BusinessError } from './business-error';

export class InvalidOrganizationError extends BusinessError {
  constructor(error?: any) {
    super('a orgaização informada é inválida.', 400, error);
  }
}
