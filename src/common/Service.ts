import { IModelAssociations, ISearchFilter } from '@src/interfaces';
import { FindOptions, Includeable, Op } from 'sequelize';

export interface IService {
  execute(...args: any): Promise<any>;
}

export abstract class Service implements IService {
  abstract execute(...args: any): Promise<any>;

  protected buildFilter({ id, createdAt, updatedAt }: ISearchFilter): FindOptions {
    const conditions: FindOptions = {};

    conditions.where = {};

    if (id) {
      conditions.where.id = id;
    }

    if (createdAt) {
      conditions.where.createdAt = {
        [Op.gte]: createdAt,
      };
    }

    if (updatedAt) {
      conditions.where.updatedAt = {
        [Op.gte]: updatedAt,
      };
    }

    return conditions.where;
  }

  protected buildIncludes(includes: string, modelAssociations: IModelAssociations): Includeable[] {
    const conditions: FindOptions = {};
    conditions.include = [];

    if (!includes) {
      return conditions.include;
    }

    const includesArray = includes.split(',');

    const findInModelAssociations = (model: string) =>
      Object.keys(modelAssociations).find((modelAssociation) => modelAssociation === model);

    conditions.include = includesArray.filter((model) => <Includeable>findInModelAssociations(model));

    return conditions.include;
  }
}
