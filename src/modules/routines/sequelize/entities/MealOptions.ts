import { BaseEntity, IBaseEntityAttributes } from '@src/common/BaseEntity';
import { BelongsTo, ForeignKey, HasMany, Table } from 'sequelize-typescript';
import { MealItems } from './MealItems';
import { Meals } from './Meals';

export interface IMealOptionsAttributes extends IBaseEntityAttributes {
  items: MealItems[];
  mealId: number;
  meal: Meals;
}

export type IMealOptionsCreationAttributes = Omit<IMealOptionsAttributes, 'id'>;

@Table({
  tableName: 'meal_options',
  timestamps: false,
  underscored: true,
})
export class MealOptions extends BaseEntity<IMealOptionsAttributes, IMealOptionsCreationAttributes> {
  @HasMany(() => MealItems, { onDelete: 'cascade', onUpdate: 'cascade' })
  items!: MealItems[];

  @ForeignKey(() => Meals)
  mealId!: number;

  @BelongsTo(() => Meals, { onDelete: 'cascade', onUpdate: 'cascade' })
  meal!: Meals;
}
