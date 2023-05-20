import joi from 'joi';
import { ESolicitationsTypes } from '@src/shared/enums';

export const createSolicitaionSchema = joi.object().keys({
  userId: joi.number().integer().min(1).required(),
  nutritionistId: joi.number().integer().min(1).required(),
  solicitationType: joi.valid(...Object.values(ESolicitationsTypes)).required(),
});
