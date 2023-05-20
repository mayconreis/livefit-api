import { Model, ModelCtor } from 'sequelize-typescript';
import { Users } from '@src/modules/users/sequelize';
import { MealItems, MealOptions, Meals, Routines } from '@src/modules/routines/sequelize';
import { Solicitations } from '@src/modules/solicitations/sequelize';

const models: ModelCtor<Model>[] = [Users, Routines, Meals, MealOptions, MealItems, Solicitations];

export default models;
