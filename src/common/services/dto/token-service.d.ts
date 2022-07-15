import { JwtPayload } from 'jsonwebtoken';

export interface GenerateTokenInput {
  userId: string;
  organizationId: string;
}

export type TokenPayload = JwtPayload & GenerateTokenInput;
