import { BelongsTo, Column, DataType, ForeignKey, HasMany, Table } from 'sequelize-typescript';
import { BaseEntity, IBaseEntityAttributes } from '@src/common/BaseEntity';
import { EMealPeriod } from '@src/shared/enums';
import { Routines } from './Routines';
import { MealOptions } from './MealOptions';

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

  @HasMany(() => MealOptions, { onDelete: 'cascade', onUpdate: 'cascade' })
  options!: MealOptions[];

  @Column(DataType.STRING)
  period!: EMealPeriod;

  @ForeignKey(() => Routines)
  routineId!: number;

  @BelongsTo(() => Routines, { onDelete: 'cascade', onUpdate: 'cascade' })
  routine!: Routines;
}
