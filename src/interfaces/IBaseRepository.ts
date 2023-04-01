import { CreateOptions, DestroyOptions, FindOptions, UpdateOptions } from 'sequelize';
import { Col, Fn, Literal, MakeNullishOptional } from 'sequelize/types/utils';
import { Model } from 'sequelize-typescript';
import { Attributes } from 'sequelize/types/model';

export interface IBaseRepository<M extends Model> {
  delete(options: DestroyOptions): Promise<number>;

  exists(conditions: FindOptions): Promise<boolean>;

  findOne(conditions: FindOptions): Promise<M | null>;

  findAll(conditions?: FindOptions): Promise<M[]>;

  findAndCountAll(conditions?: FindOptions): Promise<{ rows: M[]; count: number }>;

  bulkCreate(data: M[], options?: CreateOptions): Promise<M[]>;

  create(data: MakeNullishOptional<M>, options?: CreateOptions): Promise<M>;

  update(
    data: {
      [key in keyof Attributes<M>]?: Attributes<M>[key] | Fn | Col | Literal;
    },
    conditions: UpdateOptions<Attributes<M>>
  ): Promise<[affectedCount: number]>;
}
