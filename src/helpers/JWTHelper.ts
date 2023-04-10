import jwt from 'jsonwebtoken';
import environment from '@src/config/environment';
import { IJWTHelper, ITokenAttributes } from '@src/interfaces';

const { security } = environment;

class JWTHelper implements IJWTHelper {
  private jwt: typeof jwt;

  private readonly secretKey: string;

  constructor() {
    this.jwt = jwt;
    this.secretKey = String(security.secretKey);
  }

  sign(attributes: ITokenAttributes, personalKey: string): string {
    return this.jwt.sign(
      {
        ...attributes,
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
