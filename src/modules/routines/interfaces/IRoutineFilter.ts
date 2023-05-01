import { ISearchFilter } from '@src/interfaces';

export interface IRoutineFilter extends ISearchFilter {
  patientId?: number;
  nutritionistId?: number;
}
