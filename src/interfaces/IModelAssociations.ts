import { Model, Association } from "sequelize";

export interface IModelAssociations {
  [key: string]: Association<Model<any, any>, Model<any, any>>;
}
