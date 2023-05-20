import { ISolicitationResponse } from './ISolicitationResponse';
import { ISolicitationFilter } from './ISolicitationFilter';

export interface IGetSolicitationsService {
  execute(filter: ISolicitationFilter, include: string): Promise<ISolicitationResponse[]>;
}
