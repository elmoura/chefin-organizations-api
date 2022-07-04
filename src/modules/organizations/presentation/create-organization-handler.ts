import { LambdaResponse } from '@common/utils/lambda-response';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { dependenciesContainer } from '@src/container';
import {
  CreateOrganizationUseCase,
  CREATE_ORGANIZATION_USE_CASE_PROVIDER,
} from '../core/create-organization.usecase';
import { CreateOrganizationInput } from '../models/create-organization-input';
import { CreateOrganizationOutput } from '../models/create-organization-output';

const createOrganizationUseCase =
  dependenciesContainer.get<CreateOrganizationUseCase>(
    CREATE_ORGANIZATION_USE_CASE_PROVIDER
  );

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const body: CreateOrganizationInput = JSON.parse(event.body || '{}');

  const result = await createOrganizationUseCase.execute(body);

  return new LambdaResponse<CreateOrganizationOutput>(201, result);
};
