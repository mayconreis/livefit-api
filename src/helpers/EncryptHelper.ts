import bcrypt from 'bcrypt';
import { IEncryptHelper } from '@src/interfaces';

class EncryptHelper implements IEncryptHelper {
  private encrypter: typeof bcrypt;

  constructor() {
    this.encrypter = bcrypt;
  }

  async hash(value: string, rounds: number): Promise<string> {
    const salt = await this.genSalt(rounds);
    return this.encrypter.hash(value, salt);
  }

  async hashMatches(value: string, hashedValue: string): Promise<boolean> {
    return this.encrypter.compare(value, hashedValue);
  }

  async genSalt(rounds: number): Promise<string> {
    return this.encrypter.genSalt(Math.floor(rounds));
  }
}

export default new EncryptHelper();