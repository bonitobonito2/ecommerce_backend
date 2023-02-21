import * as crypto from 'crypto';
import { config } from 'dotenv';

config();
export const MessageEncryptionConfig = {
  key: 'helloMyFriend',
  algorithm: 'aes-256-cbc',
  ivLength: 16,
  iv: crypto.randomBytes(16).toString('hex'),
};
