import { EUserProfile } from '@src/shared/enums';

export interface ICreateUserDto {
  fullName: string;
  email: string;
  profile: EUserProfile;
  password: string;
  confirmPassword: string;
}
