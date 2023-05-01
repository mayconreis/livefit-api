import { ISearchFilter } from '@src/interfaces';
import { EUserProfile } from '@src/shared/enums';

export interface IUserFilter extends ISearchFilter {
  profile?: EUserProfile;
}
