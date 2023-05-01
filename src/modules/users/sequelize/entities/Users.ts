import { BaseEntity, IBaseEntityAttributes } from '@src/common/BaseEntity';
import { Column, DataType, Table } from 'sequelize-typescript';
import { EUserProfile } from '@src/shared/enums';

export interface IUserAttributes extends IBaseEntityAttributes {
  fullName: string;
  email: string;
  profile: EUserProfile;
  nutritionistId: number;
  password: string;
  personalKey: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IUserCreationAttributes = Omit<IUserAttributes, 'id'>;

@Table({
  tableName: 'users',
  underscored: true,
  timestamps: true,
})
export class Users extends BaseEntity<IUserAttributes, IUserCreationAttributes> implements IUserCreationAttributes {
  @Column(DataType.STRING(250))
  fullName!: string;

  @Column(DataType.STRING(100))
  email!: string;

  @Column(DataType.STRING)
  profile!: EUserProfile;

  @Column(DataType.INTEGER)
  nutritionistId!: number;

  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.STRING)
  personalKey!: string;

  @Column(DataType.DATE)
  createdAt?: Date;

  @Column(DataType.DATE)
  updatedAt?: Date;
}
