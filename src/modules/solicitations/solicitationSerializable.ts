import { Solicitations } from '@src/modules/solicitations/sequelize';
import { ISolicitationResponse } from '@src/modules/solicitations/interfaces';

export const solicitationSerializable = (solicitation: Solicitations): ISolicitationResponse =>
  <ISolicitationResponse>{
    id: solicitation.id,
    userId: solicitation.userId,
    nutritionistId: solicitation.nutritionistId,
    solicitationType: solicitation.solicitationType,
    finished: solicitation.finished,
    user: solicitation.user,
  };

export const solicitationsSerializable = (solicitations: Solicitations[]): ISolicitationResponse[] =>
  solicitations.map((solicitation) => solicitationSerializable(solicitation));
