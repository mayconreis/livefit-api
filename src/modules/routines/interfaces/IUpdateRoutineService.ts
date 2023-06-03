import { IRoutineResponse } from './IRoutineResponse';
import { IUpdateRoutineDto } from './IUpdateRoutineDto';

export interface IUpdateRoutineService {
  execute(routineId: number, body: IUpdateRoutineDto): Promise<IRoutineResponse>;
}
