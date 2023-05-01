import { BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { BaseEntity, IBaseEntityAttributes } from '@src/common/BaseEntity';
import { MealOptions } from './MealOptions';

export interface IMealItemsAttributes extends IBaseEntityAttributes {
  item: string;
  quantity: string;
  mealOptionId: number;
  mealOptions: MealOptions;
}

export type IMealItemsCreationAttributes = Omit<IMealItemsAttributes, 'id'>;

@Table({
  tableName: 'meal_items',
  underscored: true,
  timestamps: false,
})
export class MealItems extends BaseEntity<IMealItemsAttributes, IMealItemsCreationAttributes> {
  @Column(DataType.STRING)
  item!: string;

  @Column(DataType.STRING)
  quantity!: string;

  @ForeignKey(() => MealOptions)
  mealOptionId!: number;

  @BelongsTo(() => MealOptions)
  mealOptions!: MealOptions;
}
