export interface IDeleteRoutineService {
  execute(routineId: number): Promise<boolean>;
}
