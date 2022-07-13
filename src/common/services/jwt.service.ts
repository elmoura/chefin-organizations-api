import jwt, { JwtPayload } from 'jsonwebtoken';
import { injectable } from 'inversify';
import { configuration } from '@config/vars';

export interface GenerateAuthTokenInput {
  userId: string;
  organizationId: string;
}

type TokenPayload = JwtPayload & GenerateAuthTokenInput;

export const TOKEN_SERVICE_PROVIDER = 'JwtService';

export interface ITokenService {
  verifyToken(token: string): boolean;
  decodeToken(token: string): TokenPayload;
  generateToken(payload: GenerateAuthTokenInput): { accessToken: string };
}

@injectable()
export class JwtService implements ITokenService {
  private secretKey: string;

  constructor() {
    this.secretKey = configuration.crypto.secretKey;
  }

  verifyToken(token: string): boolean {
    const isValidToken = jwt.verify(token, this.secretKey);
    console.log('verifyToken', isValidToken);
    return true;
  }

  decodeToken(token: string): TokenPayload {
    return jwt.decode(token) as TokenPayload;
  }

  /**
   * @todo: adicionar tempo de expiração do token
   */
  generateToken(payload: GenerateAuthTokenInput): { accessToken: string } {
    const accessToken = jwt.sign(payload, this.secretKey);

    return { accessToken };
  }
}
