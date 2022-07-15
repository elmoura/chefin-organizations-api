export const CRYPTO_SERVICE = 'CrytoService';

export interface ICryptoService {
  encrypt(text: string): string;
  decrypt(params: string): string;
}
