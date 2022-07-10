import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { setupContainer } from '@src/container';
import { LambdaResponse } from '@common/utils/lambda-response';
import { jsonBodyParser } from '@common/utils/body-parser';
import {
  CreateUserUseCase,
  CREATE_USER_USE_CASE_PROVIDER,
} from '../core/create-user.usecase';
import { CreateUserInput } from '../models/create-user-input';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const dependenciesContainer = await setupContainer();

  const createUserUseCase = dependenciesContainer.get<CreateUserUseCase>(
    CREATE_USER_USE_CASE_PROVIDER
  );

  const body = jsonBodyParser<CreateUserInput>(event.body);

  // pega organizationId a partir do "authorization" e acrescenta na chamada do UseCase

  const createdUser = await createUserUseCase.execute(body);

  return new LambdaResponse(201, createdUser);
};
