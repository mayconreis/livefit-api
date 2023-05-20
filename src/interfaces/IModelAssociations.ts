import { Model, Association } from 'sequelize';

export interface IModelAssociations {
  [p: string]: Association<Model<any, any>, Model<any, any>>;
}
