import jwt from 'jsonwebtoken';
import { injectable } from 'inversify';
import { configuration } from '@config/vars';
import { ITokenService } from './interfaces/token-service';
import { GenerateTokenInput, TokenPayload } from './dto/token-service';

@injectable()
export class JwtService implements ITokenService {
  private secretKey: string;

  constructor() {
    this.secretKey = configuration.crypto.secretKey;
  }

  isValidToken(token: string): boolean {
    const tokenPayload = jwt.verify(token, this.secretKey);
    return Boolean(tokenPayload);
  }

  decodeToken(token: string): TokenPayload {
    return jwt.decode(token) as TokenPayload;
  }

  /**
   * @todo: adicionar tempo de expiração do token
   */
  generateToken(payload: GenerateTokenInput): { accessToken: string } {
    const accessToken = jwt.sign(payload, this.secretKey);

    return { accessToken };
  }
}
