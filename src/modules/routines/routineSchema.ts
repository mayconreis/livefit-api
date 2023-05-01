import joi from 'joi';
import { EMealPeriod } from '@src/shared/enums';

const createRoutineSchema = joi.object().keys({
  patientId: joi.number().integer().min(1).required(),
  meals: joi
    .array()
    .min(1)
    .max(3)
    .required()
    .items(
      joi.object().keys({
        period: joi
          .string()
          .trim()
          .required()
          .valid(...Object.values(EMealPeriod)),
        time: joi.string().trim().required(),
        mealOptions: joi
          .array()
          .min(1)
          .max(3)
          .required()
          .items(
            joi.object().keys({
              items: joi
                .array()
                .min(1)
                .max(3)
                .required()
                .items(
                  joi.object().keys({
                    item: joi.string().trim().required(),
                    quantity: joi.string().trim().required(),
                  })
                ),
            })
          ),
      })
    ),
});

export default createRoutineSchema;
