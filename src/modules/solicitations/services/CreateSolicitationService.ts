import { InternalError, ResponseError, Service } from '@src/common';
import { BAD_REQUEST } from 'http-status';
import { ErrorHelper } from '@src/helpers';
import { connection } from '@src/database/DatabaseSetup';
import { IUserRepository } from '@src/modules/users/sequelize';
import { EUserProfile } from '@src/shared/enums';
import { ICreateSolicitationDto, ICreateSolicitationService, ISolicitationResponse } from '../interfaces';
import { ISolicitationRepository, Solicitations } from '../sequelize';
import { solicitationSerializable } from '../solicitationSerializable';

export default class CreateSolicitationService extends Service implements ICreateSolicitationService {
  private solicitationRepository: ISolicitationRepository;

  private userRepository: IUserRepository;

  constructor(solicitationRepository: ISolicitationRepository, userRepository: IUserRepository) {
    super();
    this.solicitationRepository = solicitationRepository;
    this.userRepository = userRepository;
  }

  async execute(body: ICreateSolicitationDto): Promise<ISolicitationResponse> {
    const { userId, nutritionistId, solicitationType } = body;

    let solicitationAlreadyExists = false;
    try {
      solicitationAlreadyExists = await this.solicitationRepository.exists({
        where: {
          userId,
          nutritionistId,
          solicitationType,
          finished: false,
        },
      });
    } catch (err) {
      const error = ErrorHelper.ensureError(err);
      throw new InternalError('Unable to find record into database', error);
    }

    const userExists = await this.userRepository.exists({ where: { id: userId, profile: EUserProfile.PATIENT } });

    if (!userExists) {
      throw new ResponseError('Usuário não encontrado', BAD_REQUEST);
    }

    const nutritionistExists = await this.userRepository.exists({
      where: {
        id: nutritionistId,
        profile: EUserProfile.NUTRITIONIST,
      },
    });

    if (!nutritionistExists) {
      throw new ResponseError('Nutricionista não encontrado', BAD_REQUEST);
    }

    if (solicitationAlreadyExists) {
      throw new ResponseError(
        'Já existe uma solicitação com as mesmas informações, por favor aguarde retorno do nutricionista.',
        BAD_REQUEST
      );
    }

    let solicitation: Solicitations;

    try {
      solicitation = await connection().transaction(async (transaction) =>
        this.solicitationRepository.create(
          {
            userId,
            nutritionistId,
            solicitationType,
            finished: false,
          } as Solicitations,
          { transaction }
        )
      );
    } catch (err) {
      const error = ErrorHelper.ensureError(err);
      throw new InternalError('Unable to insert record into database', error);
    }

    return solicitationSerializable(solicitation);
  }
}
