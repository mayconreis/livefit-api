import { IRoutineResponse } from './IRoutineResponse';
import { ICreateRoutineDto } from './ICreateRoutineDto';

export interface ICreateRoutineService {
  execute(userId: number, body: ICreateRoutineDto): Promise<IRoutineResponse>;
}
