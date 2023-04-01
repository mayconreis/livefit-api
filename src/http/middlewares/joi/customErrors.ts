const brErrors = {
  'any.required': '{#label} é obrigatório',
  'string.required': '{#label} é obrigatório',
  'string.base': '{#label} deve ser uma string',
  'string.empty': '{#label} não pode ser vazio',
  'number.empty': '{#label} não pode ser vazio',
  'number.min': '{#label} deve ser no mínimo {#limit}',
  'string.min': '{#label} deve ter no mínimo {#limit} caracteres',
  'string.max': '{#label} deve ter no máximo {#limit} caracteres',
  'string.email': '{#label} inválido',
  'string.pattern.name': '{#label} inválido',
  'array.base': '{#label} deve ser um array',
  'array.min': '{#label} deve ter no mínimo {#limit} elemento',
  'array.includesRequiredKnowns': '{#label} não possui nenhum {#knownMisses}',
  'object.min': '{#label} deve ser enviado com no mínimo {#limit} elemento',
};

export default brErrors;
