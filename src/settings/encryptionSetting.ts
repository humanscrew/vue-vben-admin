import { isDevMode } from '/@/utils/env';
import { AesEncryption } from '/@/utils/cipher';

// System default cache time, in seconds
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 1;

// aes encryption key
const encryption = new AesEncryption();
export const cacheCipher = {
  key: encryption.getKey.key,
  iv: encryption.getKey.iv,
};

// Whether the system cache is encrypted using aes
export const enableStorageEncryption = !isDevMode();
