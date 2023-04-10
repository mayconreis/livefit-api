import { ILoginResponse } from './ILoginResponse';
import { ILoginDto } from './ILoginDto';

export interface ILoginService {
  execute(body: ILoginDto): Promise<ILoginResponse>;
}
