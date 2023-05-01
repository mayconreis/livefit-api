import { IUserResponse } from './IUserResponse';
import { IUpdateUserDto } from './IUpdateUserDto';

export interface IUpdateUserService {
  execute(userId: number, data: IUpdateUserDto): Promise<IUserResponse>;
}
