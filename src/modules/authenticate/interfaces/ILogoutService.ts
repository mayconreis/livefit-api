import { ILogoutResponse } from './ILogoutResponse';

export interface ILogoutService {
  execute(userId: number): Promise<ILogoutResponse>;
}
