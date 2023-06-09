import { IUserResponse } from './IUserResponse';
import { IUserFilter } from './IUserFilter';

export interface IGetUserService {
  execute(filter: IUserFilter): Promise<IUserResponse>;
}
