import { InternalError, Service } from '@src/common';
import { IUserRepository } from '@src/modules/users/sequelize';
import { ErrorHelper } from '@src/helpers';
import { connection } from '@src/database/DatabaseSetup';
import { IEncryptHelper } from '@src/interfaces';
import environment from '@src/config/environment';
import { ILogoutResponse, ILogoutService } from '../interfaces';

export default class LogoutService extends Service implements ILogoutService {
  private userRepository: IUserRepository;

  private encryptHelper: IEncryptHelper;

  private readonly rounds: number;

  constructor(userRepository: IUserRepository, encryptHelper: IEncryptHelper) {
    super();
    this.userRepository = userRepository;
    this.encryptHelper = encryptHelper;
    this.rounds = parseInt(environment.security.saltRounds, 10);
  }

  async execute(userId: number): Promise<ILogoutResponse> {
    const personalKey = await this.encryptHelper.genSalt(this.rounds);

    try {
      await connection().transaction(async (transaction) => {
        await this.userRepository.update({ personalKey }, { where: { id: userId }, transaction });
      });
    } catch (err) {
      const error = ErrorHelper.ensureError(err);
      throw new InternalError('Unable to update record into database', error);
    }

    return { message: 'Deslogado com sucesso.' };
  }
}
