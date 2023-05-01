import { EUserProfile } from '@src/shared/enums';

export interface IUpdateUserDto {
  fullName?: string;
  profile?: EUserProfile;
  nutritionistId?: number;
}
