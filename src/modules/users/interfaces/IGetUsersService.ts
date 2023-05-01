import { IUserResponse } from './IUserResponse';
import { IUserFilter } from './IUserFilter';

export interface IGetUsersService {
  execute(filter: IUserFilter): Promise<IUserResponse[]>;
}
