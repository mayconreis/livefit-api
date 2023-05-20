import { ISolicitationResponse } from './ISolicitationResponse';
import { ICreateSolicitationDto } from './ICreateSolicitationDto';

export interface ICreateSolicitationService {
  execute(body: ICreateSolicitationDto): Promise<ISolicitationResponse>;
}
