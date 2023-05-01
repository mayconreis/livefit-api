import { MealOptions } from './MealOptions';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Table } from 'sequelize-typescript';
import { BaseEntity, IBaseEntityAttributes } from '@src/common/BaseEntity';
import { Routines } from './Routines';
import { EMealPeriod } from '@src/shared/enums';

export interface IMealsAttributes extends IBaseEntityAttributes {
  time: string;
  options: MealOptions[];
  period: EMealPeriod;
  routineId: number;
  routine: Routines;
}

export type IMealsCreationAttributes = Omit<IMealsAttributes, 'id'>;

@Table({
  tableName: 'meals',
  underscored: true,
  timestamps: false,
})
export class Meals extends BaseEntity<IMealsAttributes, IMealsCreationAttributes> {
  @Column(DataType.TIME)
  time!: string;

  @HasMany(() => MealOptions)
  options!: MealOptions[];

  @Column(DataType.STRING)
  period!: EMealPeriod;

  @ForeignKey(() => Routines)
  routineId!: number;

  @BelongsTo(() => Routines)
  routine!: Routines;
}
