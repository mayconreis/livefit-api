import { ISearchFilter } from '@src/interfaces';
import { ESolicitationsTypes } from '@src/shared/enums';

export interface ISolicitationFilter extends ISearchFilter {
  solicitationType?: ESolicitationsTypes;
  userId?: number;
  nutritionistId?: number;
  finished?: boolean;
}
