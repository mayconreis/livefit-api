import { ICreateUserDto } from './ICreateUserDto';
import { IUserResponse } from './IUserResponse';

export interface ICreateUserService {
  execute(body: ICreateUserDto): Promise<IUserResponse>;
}