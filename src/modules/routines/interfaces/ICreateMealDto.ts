import { EMealPeriod } from '@src/shared/enums';
import { ICreateMealOptionDto } from './ICreateMealOptionDto';

export interface ICreateMealDto {
  period: EMealPeriod;
  time: string;
  mealOptions: ICreateMealOptionDto[];
}
