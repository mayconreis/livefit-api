import { ICreateMealDto } from '@src/modules/routines/interfaces/ICreateMealDto';

export interface ICreateRoutineDto {
  patientId: number;
  meals: ICreateMealDto[];
}
