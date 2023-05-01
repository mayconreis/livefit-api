import { BaseEntity, IBaseEntityAttributes } from '@src/common/BaseEntity';
import { Column, DataType, HasMany, Table } from 'sequelize-typescript';
import { Meals } from './Meals';

export interface IRoutineAttributes extends IBaseEntityAttributes {
  patientId: number;
  nutritionistId: number;
  meals: Meals[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type IRoutineCreationAttributes = Omit<IRoutineAttributes, 'id'>;

@Table({
  tableName: 'routines',
  underscored: true,
  timestamps: true,
})
export class Routines extends BaseEntity<IRoutineAttributes, IRoutineCreationAttributes> {
  @Column(DataType.INTEGER)
  patientId!: number;

  @Column(DataType.INTEGER)
  nutritionistId!: number;

  @HasMany(() => Meals)
  meals!: Meals[];

  @Column(DataType.DATE)
  createdAt?: Date;

  @Column(DataType.DATE)
  updatedAt?: Date;
}
