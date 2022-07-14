export const CRYPTO_SERVICE_PROVIDER = 'CrytoService';

export interface ICryptoService {
  encrypt(text: string): string;
  decrypt(params: string): string;
}
