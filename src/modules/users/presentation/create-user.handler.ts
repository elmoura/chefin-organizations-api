import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { dependenciesContainer } from '@src/container';
import { LambdaResponse } from '@common/utils/lambda-response';
import {
  CreateUserUseCase,
  CREATE_USER_USE_CASE_PROVIDER,
} from '../core/create-user.usecase';
import { CreateUserInput } from '../models/create-user-input';

const createUserUseCase = dependenciesContainer.get<CreateUserUseCase>(
  CREATE_USER_USE_CASE_PROVIDER
);

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const body: CreateUserInput = JSON.parse(event.body || '{}');

  const createdUser = await createUserUseCase.execute(body);

  return new LambdaResponse(201, createdUser);
};
