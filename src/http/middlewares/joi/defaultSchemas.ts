import joi from 'joi';

export const defaultFilterSchema = {
  query: joi.string().trim().label('Busca'),
  createdAt: joi.date().label('Data criado'),
  updatedAt: joi.date().label('Data alterado'),
};

export const defaultIncludeSchema = joi
  .string()
  .regex(/^(\s?[^\s,]+\s?,)*(\s?[^\s,]+)$/, 'include')
  .trim()
  .label('Include');
