import { InternalError, ResponseError, Service } from '@src/common';
import { ErrorHelper } from '@src/helpers';
import { BAD_REQUEST, NOT_FOUND } from 'http-status';
import { connection } from '@src/database/DatabaseSetup';
import { userSerializable } from '@src/modules/users/userSerializable';
import { IUserRepository, Users } from '../sequelize';
import { IUpdateUserDto, IUpdateUserService, IUserResponse } from '../interfaces';
import { EUserProfile } from '@src/shared/enums';

export default class UpdateUserService extends Service implements IUpdateUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    super();
    this.userRepository = userRepository;
  }

  async execute(userId: number, data: IUpdateUserDto): Promise<IUserResponse> {
    const { fullName, nutritionistId, profile } = data;
    let user: Users | null;

    try {
      user = await this.userRepository.findOne({ where: { id: userId } });
    } catch (err) {
      const error = ErrorHelper.ensureError(err);
      throw new InternalError('Unable to find record into database', error);
    }

    if (!user) {
      throw new ResponseError('Usuário não foi encontrado', NOT_FOUND);
    }

    if (fullName) {
      user.fullName = fullName;
    }

    if (profile) {
      user.profile = profile;
    }

    if (nutritionistId) {
      user.nutritionistId = nutritionistId;

      const userIsNutritionist = await this.userRepository.exists({
        where: {
          id: userId,
          profile: EUserProfile.NUTRITIONIST,
        },
      });

      if (userIsNutritionist) {
        throw new ResponseError('Usuário com perfil nutricionista não pode ter um nutricionista atrelado', BAD_REQUEST);
      }

      const nutritionistExists = await this.userRepository.exists({ where: { id: nutritionistId } });

      if (!nutritionistExists) {
        throw new ResponseError('Nutricionista informado não foi encontrado', BAD_REQUEST);
      }
    }

    try {
      await connection().transaction(async (transaction) => user?.save({ transaction }));
    } catch (err) {
      const error = ErrorHelper.ensureError(err);
      throw new InternalError('Unable to update record into database', error);
    }

    return userSerializable(user);
  }
}
