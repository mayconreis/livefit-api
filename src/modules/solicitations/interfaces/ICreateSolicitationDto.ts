import { ESolicitationsTypes } from '@src/shared/enums';

export interface ICreateSolicitationDto {
  userId: number;
  nutritionistId: number;
  solicitationType: ESolicitationsTypes;
}
