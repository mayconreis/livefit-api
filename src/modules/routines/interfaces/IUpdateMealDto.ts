import { EMealPeriod } from '@src/shared/enums';
import { IUpdateMealItemDto } from './IUpdateMealItemDto';

export interface IUpdateMealDto {
  id: number;
  period: EMealPeriod;
  time: string;
  mealItems: IUpdateMealItemDto[];
}
