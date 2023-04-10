import { Model, ModelCtor } from 'sequelize-typescript';
import { Users } from '@src/modules/users/sequelize';

const models: ModelCtor<Model>[] = [Users];

export default models;
