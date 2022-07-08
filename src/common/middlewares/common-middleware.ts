import middy from '@middy/core';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const commonMiddleware = (handler: APIGatewayProxyHandler) =>
  middy(handler);
