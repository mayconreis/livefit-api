import { IModelAssociations, ISearchFilter } from '@src/interfaces';
import { FindOptions, Includeable, Op } from 'sequelize';
import { StringHelper } from '@src/helpers';

export interface IService {
  execute(...args: any): Promise<any>;
}

export abstract class Service implements IService {
  abstract execute(...args: any): Promise<any>;

  protected buildFilter({ status, createdAt, updatedAt }: ISearchFilter): FindOptions {
    const conditions: FindOptions = {};

    conditions.where = {};

    if (status) {
      conditions.where.status = StringHelper.toUpper(status);
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

    return conditions;
  }

  protected buildIncludes(includes: string, modelAssociations: IModelAssociations): FindOptions {
    const conditions: FindOptions = {};

    if (!includes) {
      return conditions;
    }

    const includesArray = includes.split(',');

    conditions.include = [];

    const findInModelAssociations = (model: string) =>
      Object.keys(modelAssociations).find((modelAssociation) => modelAssociation === model);

    conditions.include = includesArray.filter((model) => <Includeable>findInModelAssociations(model));

    return conditions;
  }
}
