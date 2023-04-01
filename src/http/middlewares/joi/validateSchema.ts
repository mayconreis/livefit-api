import { Schema } from 'joi';
import { ESchemaType } from '@src/shared/enums';
import { NextFunction, Request, Response } from 'express';
import brErrors from '@src/http/middlewares/joi/customErrors';
import { ResponseError } from '@src/common';
import { UNPROCESSABLE_ENTITY } from 'http-status';

const validateSchema = (schema: Schema, type: ESchemaType) => (req: Request, res: Response, next: NextFunction) => {
  let errors: string[] = [];

  if (type === ESchemaType.QUERY) {
    const { query } = req;
    const queryResult = schema.validate(query, { abortEarly: false, messages: brErrors, stripUnknown: true });

    errors = errors.concat(queryResult.error ? queryResult.error.details.map((m) => m.message) : []);
  } else {
    const { body } = req;
    const bodyResult = schema.validate(body, { abortEarly: false, messages: brErrors, stripUnknown: true });

    errors = errors.concat(bodyResult.error ? bodyResult.error.details.map((m) => m.message) : []);
  }

  if (errors.length) {
    const message = errors.join(',');
    next(new ResponseError(message, UNPROCESSABLE_ENTITY));
  } else {
    next();
  }
};

export default validateSchema;
