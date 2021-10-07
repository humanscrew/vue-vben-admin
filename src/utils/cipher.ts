import { encrypt, decrypt } from 'crypto-js/aes';
import { parse } from 'crypto-js/enc-utf8';
import pkcs7 from 'crypto-js/pad-pkcs7';
import OFB from 'crypto-js/mode-ofb';
import md5 from 'crypto-js/md5';
import UTF8 from 'crypto-js/enc-utf8';
import Base64 from 'crypto-js/enc-base64';
import WordArray from 'crypto-js/lib-typedarrays';
import { JSEncrypt } from 'jsencrypt';
import { isString } from '/@/utils/is';

export interface AesEncryptionParams {
  key: string;
  iv: string;
}

export class AesEncryption {
  private key: WordArray;
  private iv: WordArray;
  private aesKey: string;
  private aesIV: string;

  constructor(opt: Partial<AesEncryptionParams> = {}) {
    const { key, iv } = opt;
    this.aesKey = key || WordArray.random(8).toString();
    this.aesIV = iv || WordArray.random(8).toString();
    this.key = parse(this.aesKey);
    this.iv = parse(this.aesIV);
  }

  get getOptions() {
    return {
      mode: OFB,
      padding: pkcs7,
      iv: this.iv,
    };
  }

  get getKey() {
    return {
      key: this.aesKey,
      iv: this.aesIV,
    };
  }

  encryptByAES(cipherVar: string | object) {
    if (isString(cipherVar)) {
      const encryptText = encrypt(cipherVar, this.key, this.getOptions).toString();
      return encryptText;
    }
    Object.keys(cipherVar).forEach((key) => {
      const item = cipherVar[key];
      const cipherText = JSON.stringify(item);
      const encryptItem = encrypt(cipherText, this.key, this.getOptions).toString();
      cipherVar[key] = encryptItem;
    });
    return cipherVar;
  }

  decryptByAES(cipherVar: string | object) {
    if (isString(cipherVar)) {
      const decryptText = decrypt(cipherVar, this.key, this.getOptions).toString(UTF8);
      return decryptText;
    }
    Object.keys(cipherVar).forEach((key) => {
      const item = cipherVar[key];
      const decryptItem = decrypt(item, this.key, this.getOptions).toString(UTF8);
      cipherVar[key] = JSON.parse(decryptItem);
    });
    return cipherVar;
  }

  encryptAesKeyByRsa(publicKey: string) {
    const RSA = new RsaEncryption({ publicKey });
    const aesKey = RSA.encryptByRSA(this.aesKey);
    const aesIV = RSA.encryptByRSA(this.aesIV);
    return { aesKey, aesIV };
  }
}

export function encryptByBase64(cipherText: string) {
  return UTF8.parse(cipherText).toString(Base64);
}

export function decodeByBase64(cipherText: string) {
  return Base64.parse(cipherText).toString(UTF8);
}

export function encryptByMd5(password: string) {
  return md5(password).toString();
}

export interface RsaEncryptionParams {
  publicKey: string;
  privateKey: string;
}

export class RsaEncryption {
  private publicKey;
  // private privateKey;

  constructor(opt: Partial<RsaEncryptionParams> = {}) {
    const { publicKey } = opt;
    this.publicKey = publicKey;
  }

  encryptByRSA(cipherText: string): string {
    const jse = new JSEncrypt({ default_key_size: '2048' });
    jse.setPublicKey(this.publicKey);
    const encryptText = jse.encrypt(cipherText) || '';
    return encryptText;
  }
}
