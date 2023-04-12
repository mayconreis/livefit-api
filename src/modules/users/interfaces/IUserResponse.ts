import { EUserProfile } from '@src/shared/enums';

export interface IUserResponse {
  fullName: string;
  email: string;
  profile: EUserProfile;
  createdAt?: Date;
  updatedAt?: Date;
}
