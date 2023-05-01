import { Model, ModelCtor } from 'sequelize-typescript';
import { Users } from '@src/modules/users/sequelize';
import { MealItems, MealOptions, Meals, Routines } from '@src/modules/routines/sequelize';

const models: ModelCtor<Model>[] = [Users, Routines, Meals, MealOptions, MealItems];

export default models;
