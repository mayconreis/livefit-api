import { Model, ModelCtor } from 'sequelize-typescript';
import { IBaseRepository, IModelAssociations } from '@src/interfaces';
import { BulkCreateOptions, CreateOptions, FindOptions, UpdateOptions } from 'sequelize';
import { Logger } from '@src/helpers';
import { Col, Fn, Literal, MakeNullishOptional } from 'sequelize/types/utils';
import { Attributes } from 'sequelize/types/model';

export default abstract class BaseRepository<M extends Model> implements IBaseRepository<M> {
  public static readonly BaseQueryRaw = { raw: false, nest: false };

  protected model: ModelCtor<M>;

  protected constructor(model: ModelCtor<M>) {
    this.model = model;
  }

  async delete(conditions?: FindOptions): Promise<number> {
    const response = await this.model.destroy<M>(conditions);

    Logger.Debug(`Response Query Delete`, {
      model: this.model,
      conditions,
      response,
    });

    return response;
  }

  async exists(conditions?: FindOptions): Promise<boolean> {
    const response = await this.model.findOne({
      ...BaseRepository.BaseQueryRaw,
      ...conditions,
    });

    Logger.Debug(`Response Query Exists`, {
      model: this.model,
      conditions,
      response,
    });

    return Boolean(response);
  }

  async findOne(conditions?: FindOptions): Promise<M | null> {
    const response = await this.model.findOne<M>({
      ...BaseRepository.BaseQueryRaw,
      ...conditions,
    });

    Logger.Debug(`Response Query FindOne`, {
      model: this.model,
      conditions,
      response,
    });

    return response;
  }

  getAssociations(): IModelAssociations {
    return this.model.associations;
  }

  async findAll(conditions?: FindOptions): Promise<M[]> {
    const response = await this.model.findAll<M>({
      ...BaseRepository.BaseQueryRaw,
      ...conditions,
    });

    Logger.Debug(`Response Query FindAll`, {
      model: this.model,
      conditions,
      response,
    });

    return response;
  }

  async findAndCountAll(conditions?: FindOptions): Promise<{ rows: M[]; count: number }> {
    const response = await this.model.findAndCountAll<M>({
      ...BaseRepository.BaseQueryRaw,
      ...conditions,
    });

    Logger.Debug(`Response Query findAndCountAll`, {
      model: this.model,
      conditions,
      count: response.count,
      response: response.rows,
    });

    return response;
  }

  async bulkCreate(data: M[], conditions?: BulkCreateOptions): Promise<M[]> {
    const response = await this.model.bulkCreate<M>(data as MakeNullishOptional<M>[], conditions);

    Logger.Debug(`Response Query Bulk Create`, {
      model: this.model,
      conditions,
      response,
    });

    return response;
  }

  async create(data: MakeNullishOptional<M>, conditions?: CreateOptions): Promise<M> {
    const response = await this.model.create<M>(data, conditions);

    Logger.Debug(`Response Query Create`, {
      model: this.model,
      response,
    });

    return response;
  }

  async update(
    data: {
      [key in keyof Attributes<M>]?: Attributes<M>[key] | Fn | Col | Literal;
    },
    conditions: UpdateOptions<Attributes<M>>
  ): Promise<[affectedCount: number]> {
    const response = await this.model.update<M>(data, conditions);

    Logger.Debug(`Response Query Update`, {
      model: this.model,
      response,
    });

    return response;
  }
}
