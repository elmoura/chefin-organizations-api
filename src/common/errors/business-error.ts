export interface IErrorResponse {
  message: string[];
  statusCode: number;
  error?: any;
}

export class BusinessError extends Error {
  public response: IErrorResponse;

  constructor(
    public readonly message: string,
    public readonly statusCode: number,
    error?: any
  ) {
    super();
    this.response = {
      statusCode,
      message: [message],
      error,
    };
  }
}
