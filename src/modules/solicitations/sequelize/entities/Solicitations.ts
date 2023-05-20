import { BaseEntity, IBaseEntityAttributes } from '@src/common/BaseEntity';
import { ESolicitationsTypes } from '@src/shared/enums';
import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Table, UpdatedAt } from 'sequelize-typescript';
import { Users } from '@src/modules/users/sequelize';

export interface ISolicitationsAttributes extends IBaseEntityAttributes {
  userId: number;
  nutritionistId: number;
  solicitationType: ESolicitationsTypes;
  finished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ISolicitationCreationAttributes = Omit<ISolicitationsAttributes, 'id'>;

@Table({
  tableName: 'solicitations',
  timestamps: true,
  underscored: true,
})
export class Solicitations extends BaseEntity<ISolicitationsAttributes, ISolicitationCreationAttributes> {
  @ForeignKey(() => Users)
  userId!: number;

  @BelongsTo(() => Users)
  user!: Users;

  @Column(DataType.INTEGER)
  nutritionistId!: number;

  @Column(DataType.STRING)
  solicitationType!: ESolicitationsTypes;

  @Column(DataType.BOOLEAN)
  finished!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
