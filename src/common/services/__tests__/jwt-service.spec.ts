import { JwtService } from '../jwt.service';
import { GenerateTokenInput } from '../dto/token-service';

describe('JwtService', () => {
  const jwtService = new JwtService();

  const generateTokenInput: GenerateTokenInput = {
    userId: 'mock_user_id',
    organizationId: 'mock_organization_id',
  };

  test('generates and decodes a JWT token maintaining the payload original state', () => {
    const { accessToken } = jwtService.generateToken(generateTokenInput);

    const decryptedToken = jwtService.decodeToken(accessToken);

    expect(decryptedToken.iat).toBeTruthy();
    expect(decryptedToken.userId).toEqual(generateTokenInput.userId);
    expect(decryptedToken.organizationId).toEqual(
      generateTokenInput.organizationId
    );
  });

  test('verifies a received JWT token', () => {
    const { accessToken } = jwtService.generateToken(generateTokenInput);

    const result = jwtService.isValidToken(accessToken);

    expect(result).toBe(true);
  });
});
