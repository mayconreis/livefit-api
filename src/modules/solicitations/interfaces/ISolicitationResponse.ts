import { ESolicitationsTypes } from '@src/shared/enums';
import { Users } from '@src/modules/users/sequelize';

export interface ISolicitationResponse {
  id: number;
  userId: number;
  nutritionistId: number;
  solicitationType: ESolicitationsTypes;
  finished: boolean;
  users?: Users[];
}
