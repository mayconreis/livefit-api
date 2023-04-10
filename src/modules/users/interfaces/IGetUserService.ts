import { IUserResponse } from './IUserResponse';

export interface IGetUserService {
  execute(userId: number): Promise<IUserResponse>;
}
