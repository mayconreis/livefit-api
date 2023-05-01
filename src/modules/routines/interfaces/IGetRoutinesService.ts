import { IRoutineResponse } from './IRoutineResponse';

export interface IGetRoutinesService {
  execute(): Promise<IRoutineResponse[]>;
}
