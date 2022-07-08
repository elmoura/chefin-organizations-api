export class InternalServerError {
  public readonly statusCode = 500;

  constructor(public readonly message = 'Internal server error.') {}
}
