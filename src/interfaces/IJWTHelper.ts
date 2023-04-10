import { ITokenAttributes } from './ITokenAttibutes';

export interface IJWTHelper {
  sign(attributes: ITokenAttributes, personalKey: string): string;

  verify(token: string, personalKey: string): ITokenAttributes;

  decodePayload(token: string): ITokenAttributes;
}
