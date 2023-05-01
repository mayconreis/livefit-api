import { Users } from './sequelize';
import { IUserResponse } from './interfaces';

export const userSerializable = (user: Users): IUserResponse =>
  <IUserResponse>{
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    profile: user.profile,
    nutritionistId: user.nutritionistId,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

export const usersSerializable = (users: Users[]): IUserResponse[] => users.map((user) => userSerializable(user));
