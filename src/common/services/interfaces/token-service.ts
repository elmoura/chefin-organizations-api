import { GenerateTokenInput, TokenPayload } from '../dto/token-service';

export const TOKEN_SERVICE = 'JwtService';

export interface ITokenService {
  isValidToken(token: string): boolean;
  decodeToken(token: string): TokenPayload;
  generateToken(payload: GenerateTokenInput): { accessToken: string };
}
