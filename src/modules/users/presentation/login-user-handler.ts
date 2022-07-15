import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { setupContainer } from '@src/container';
import { jsonBodyParser } from '@common/utils/body-parser';
import { LambdaResponse } from '@common/utils/lambda-response';
import { LoginUserInput } from '../models/login-user-input';
import {
  LoginUserUseCase,
  LOGIN_USER_USE_CASE,
} from '../core/login-user.usecase';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const dependenciesContainer = await setupContainer();

  const loginUserUseCase =
    dependenciesContainer.get<LoginUserUseCase>(LOGIN_USER_USE_CASE);

  const requestBody = jsonBodyParser<LoginUserInput>(event.body);

  const result = await loginUserUseCase.execute(requestBody);

  return new LambdaResponse(200, result);
};
