import middy from '@middy/core';
import httpRouterHandler, { Route } from '@middy/http-router';
import { errorHandlerMiddleware } from '@common/middlewares/error-handler-middleware';
import { handler as createOrganizationHandler } from '@modules/organizations/presentation/create-organization-handler';
import { handler as createUserHandler } from '@modules/users/presentation/create-user-handler';

const routes: Route[] = [
  {
    method: 'POST',
    path: '/organizations',
    handler: createOrganizationHandler,
  },
  {
    method: 'POST',
    path: '/organizations/users',
    handler: createUserHandler,
  },
];

const routerHandler = httpRouterHandler(routes);

export const handler = middy()
  .handler(routerHandler)
  .onError(errorHandlerMiddleware);
