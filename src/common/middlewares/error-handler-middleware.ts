import { BusinessError } from '@common/errors/business-error';
import { InternalServerError } from '@common/errors/internal-server-error';
import { LambdaResponse } from '@common/utils/lambda-response';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

interface RequestType {
  event: APIGatewayProxyEvent;
  context: Context;
  error: any;
  response?: any;
}

export const errorHandlerMiddleware = (request: RequestType) => {
  const isTreatedError =
    Boolean(request.error) && request.error instanceof BusinessError;

  if (isTreatedError) {
    const appError: BusinessError = request.error;

    request.response = new LambdaResponse(
      appError.statusCode,
      appError.response
    );

    return request.response;
  }

  console.error('Unexpected error =>', request.error);

  request.response = new LambdaResponse(500, new InternalServerError());
  return request.response;
};
