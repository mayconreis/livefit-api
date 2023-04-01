import { AutoIncrement, Column, DataType, Model, PrimaryKey } from 'sequelize-typescript';

export interface IBaseEntityAttributes {
  id: number;
}

export abstract class BaseEntity<T extends IBaseEntityAttributes, M extends object> extends Model<T, M> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;
}
