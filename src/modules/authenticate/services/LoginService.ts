import { InternalError, ResponseError, Service } from '@src/common';
import { IUserRepository, Users } from '@src/modules/users/sequelize';
import { IEncryptHelper, IJWTHelper } from '@src/interfaces';
import { ErrorHelper } from '@src/helpers';
import { UNAUTHORIZED } from 'http-status';
import authenticateSerializable from '../authenticateSerializable';
import { ILoginDto, ILoginResponse, ILoginService } from '../interfaces';

export default class LoginService extends Service implements ILoginService {
  private userRepository: IUserRepository;

  private jwtHelper: IJWTHelper;

  private encryptHelper: IEncryptHelper;

  constructor(userRepository: IUserRepository, jwtHelper: IJWTHelper, encryptHelper: IEncryptHelper) {
    super();
    this.userRepository = userRepository;
    this.jwtHelper = jwtHelper;
    this.encryptHelper = encryptHelper;
  }

  async execute(body: ILoginDto): Promise<ILoginResponse> {
    const { email, password } = body;

    let user: Users | null;

    try {
      user = await this.userRepository.findOne({ where: { email } });
    } catch (err) {
      const error = ErrorHelper.ensureError(err);
      throw new InternalError('Unable to find record into database', error);
    }

    if (!user) {
      throw new ResponseError('Email ou senha incorretos.', UNAUTHORIZED);
    }

    const isValidPassword = this.encryptHelper.hashMatches(password, user.password);

    if (!isValidPassword) {
      throw new ResponseError('Email ou senha incorretos.', UNAUTHORIZED);
    }

    const token = this.jwtHelper.sign({ email: user.email }, user.personalKey);

    return authenticateSerializable(token);
  }
}
