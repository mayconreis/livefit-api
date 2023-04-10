export interface IEncryptHelper {
  hash(value: string, rounds: number): Promise<string>;

  hashMatches(value: string, hashedValue: string): Promise<boolean>

  genSalt(rounds: number): Promise<string>
}