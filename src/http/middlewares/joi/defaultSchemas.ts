import joi from 'joi';
import { EStatus } from '@src/shared/enums';

export const defaultFilterSchema = {
  query: joi.string().trim().label('Busca'),
  status: joi
    .string()
    .trim()
    .valid(...Object.values(EStatus))
    .messages({ 'any.only': '{#label} deve estar entre as opções {#valids}' })
    .label('Status'),
  createdAt: joi.date().label('Data criado'),
  updatedAt: joi.date().label('Data alterado'),
};

export const defaultIncludeSchema = joi
  .string()
  .regex(/^(\s?[^\s,]+\s?,)*(\s?[^\s,]+)$/, 'include')
  .trim()
  .label('Include');
