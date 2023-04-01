import { EStatus } from '@src/shared/enums';

export interface ISearchFilter {
  status?: EStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
