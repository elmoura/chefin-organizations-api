export class LambdaResponse<ResponseType = Record<string, any>> {
  public body: string;

  constructor(public statusCode: number, responseBody: ResponseType) {
    this.body = JSON.stringify(responseBody);
  }
}
