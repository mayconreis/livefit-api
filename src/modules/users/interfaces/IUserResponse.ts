import { EUserProfile } from '@src/shared/enums';

export interface IUserResponse {
  id: number;
  fullName: string;
  email: string;
  profile: EUserProfile;
  nutritionistId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
