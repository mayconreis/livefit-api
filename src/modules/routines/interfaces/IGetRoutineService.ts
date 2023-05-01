import { IRoutineResponse } from './IRoutineResponse';
import { IRoutineFilter } from './IRoutineFilter';

export interface IGetRoutineService {
  execute(filter: IRoutineFilter): Promise<IRoutineResponse>;
}
