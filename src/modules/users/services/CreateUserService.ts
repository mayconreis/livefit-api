import { InternalError, ResponseError, Service } from '@src/common';
import { BAD_REQUEST } from 'http-status';
import { IEncryptHelper } from '@src/interfaces';
import environment from '@src/config/environment';
import { Op } from 'sequelize';
import { connection } from '@src/database/DatabaseSetup';
import { ErrorHelper } from '@src/helpers';
import { userSerializable } from '../userSerializable';
import { IUserRepository, Users } from '../sequelize';
import { ICreateUserDto, ICreateUserService, IUserResponse } from '../interfaces';

export default class CreateUserService extends Service implements ICreateUserService {
  private userRepository: IUserRepository;

  private encryptHelper: IEncryptHelper;

  private readonly rounds: number;

  constructor(userRepository: IUserRepository, encryptHelper: IEncryptHelper) {
    super();
    this.userRepository = userRepository;
    this.encryptHelper = encryptHelper;
    this.rounds = parseInt(environment.security.saltRounds, 10);
  }

  async execute(body: ICreateUserDto): Promise<IUserResponse> {
    const { fullName, password, email, profile } = body;

    let userAlreadyExists: boolean;
    try {
      userAlreadyExists = await this.userRepository.exists({ where: { [Op.or]: [{ email }] } });
    } catch (err) {
      const error = ErrorHelper.ensureError(err);
      throw new InternalError('Unable to find record into database', error);
    }

    if (userAlreadyExists) {
      throw new ResponseError('Email informado já possui cadastro no sistema.', BAD_REQUEST);
    }

    const [hashedPassword, personalKey] = await Promise.all([
      this.encryptHelper.hash(password, this.rounds),
      this.encryptHelper.genSalt(this.rounds),
    ]);

    let user: Users;
    try {
      user = await connection().transaction(async (transaction) =>
        this.userRepository.create(
          {
            fullName,
            email,
            profile,
            password: hashedPassword,
            personalKey,
          } as Users,
          { transaction }
        )
      );
    } catch (err) {
      const error = ErrorHelper.ensureError(err);
      throw new InternalError('Unable to insert record into database', error);
    }

    return userSerializable(user);
  }
}
