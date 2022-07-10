import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { BusinessError } from '@common/errors/business-error';
import { LambdaResponse } from '@common/utils/lambda-response';
import { InternalServerError } from '@common/errors/internal-server-error';

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
    const treatedError: BusinessError = request.error;

    request.response = new LambdaResponse(
      treatedError.statusCode,
      treatedError.response
    );

    return request.response;
  }

  console.error('Unexpected error =>', request.error);

  request.response = new LambdaResponse(500, new InternalServerError());
  return request.response;
};
