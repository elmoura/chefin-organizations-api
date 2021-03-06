/* eslint-disable no-useless-escape */
import { Container } from 'inversify';
import 'reflect-metadata';
import { CryptoService } from '../crypto.service';
import { CRYPTO_SERVICE } from '../interfaces/crypto-service';

describe('CryptoService tests', () => {
  let cryptoService: CryptoService;

  beforeAll(() => {
    const testContainer = new Container();

    testContainer.bind(CRYPTO_SERVICE).to(CryptoService);

    cryptoService = testContainer.get(CRYPTO_SERVICE);
  });

  test('must encrypt and decrypt a string maintaining its original value', async () => {
    const testText = `
    🤡ÅŤÅQŮĘ ĐØ§ PÅĽHÅÇØ§ ĽØĶØ🤡
    AGORA É NOIS QUE MANDA NESSA PORRA ☣☣☣👿
    
    🤡SAIAM DO GRUPO 🤡 COMEÇOU O ATAQUE 🤡🤡🤡 HÁ! HÁ! HÁ! HÁ! HÁ! 🤡🤡🤡🤡🤡🤡
    
    VØÇË§ FØŘÅM ÅŤÅČÅĐØ§ PËĽØ§ PÅĽHÅÇØ§ ĽØĶØ§ Ø§ ČØMËĐØŘË§ ĐË ÄĐMÎÑÎ§ŤŘÅĐØ 🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡 🤡🤡🤡🤡🤡🤡
    
    ̿̿ ̿̿ ̿̿ ̿'̿'\̵͇̿̿\з= 🤡 =ε/̵͇̿̿/’̿’̿ ̿ ̿̿ ̿̿ ̿̿
    
    ( . ) __// 🍆 \\__
    
    🤡PÅĽHÅÇØ§ ĽØĶØ🤡
    
    Ta-Em-CHoK kk❓⚡
    `;

    const encryptedData = cryptoService.encrypt(testText);
    const decryptedData = cryptoService.decrypt(encryptedData);

    expect(decryptedData).toEqual(testText);
  });
});
