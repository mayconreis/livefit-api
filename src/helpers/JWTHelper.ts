import jwt from 'jsonwebtoken';
import environment from '@src/config/environment';

const { security } = environment;

export interface ITokenAttributes {
  username: string;
}

export interface IJWTHelper {
  sign(username: string, personalKey: string): string;

  verify(token: string, personalKey: string): ITokenAttributes;

  decodePayload(token: string): ITokenAttributes;
}

class JWTHelper implements IJWTHelper {
  private jwt: typeof jwt;

  private readonly secretKey: string;

  constructor() {
    this.jwt = jwt;
    this.secretKey = String(security.secretKey);
  }

  sign(username: string, personalKey: string): string {
    return this.jwt.sign(
      {
        username,
      },
      this.createSecreteString(personalKey),
      { expiresIn: security.expiresToken }
    );
  }

  verify(token: string, personalKey: string): ITokenAttributes {
    return this.jwt.verify(token, this.createSecreteString(personalKey)) as ITokenAttributes;
  }

  decodePayload(token: string): ITokenAttributes {
    return this.jwt.decode(token) as ITokenAttributes;
  }

  private createSecreteString(personalKey: string): string {
    return `${this.secretKey}${personalKey})`;
  }
}

export default new JWTHelper();
