import { NextFunction, Request, Response } from 'express';
import { UserRepository, Users } from '@src/modules/users/sequelize';
import { requestLogger } from '@src/http/error/logger';
import { ResponseError } from '@src/common';
import { UNAUTHORIZED } from 'http-status';
import { EncryptHelper, JWTHelper } from '@src/helpers';
import { JsonWebTokenError } from 'jsonwebtoken';
import { connection } from '@src/database/DatabaseSetup';
import environment from '@src/config/environment';

const rounds = parseInt(environment.security.saltRounds, 10);

const extractToken = (req: Request): string => {
  let token = '';

  const { authorization } = req.headers;

  if (authorization) {
    const tokenPart = authorization.split(' ')[1];

    if (tokenPart) {
      token = tokenPart;
    }
  }

  return token;
};

const findUser = async (email: string): Promise<null | Users> => {
  const userRepository = new UserRepository();

  return userRepository.findOne({ where: { email } });
};

export default async function (req: Request, _res: Response, next: NextFunction) {
  requestLogger(req);

  const token = extractToken(req);

  if (!token) {
    return next(
      new ResponseError('Token não encontrado, por favor faça login novamente para se conectar', UNAUTHORIZED)
    );
  }

  const payload = JWTHelper.decodePayload(token);

  if (!payload?.email) {
    return next(new ResponseError('Token inválido', UNAUTHORIZED));
  }

  const user = await findUser(payload?.email);

  if (!user) {
    return next(new ResponseError('Token inválido', UNAUTHORIZED));
  }

  try {
    JWTHelper.verify(token, user.personalKey);

    req.userId = user.id;
    return next();
  } catch (err) {
    let message = 'Token inválido';

    if (err instanceof JsonWebTokenError) {
      message = 'Seu token expirou, por favor faça login novamente para se conectar.';
      user.personalKey = await EncryptHelper.genSalt(rounds);

      await connection().transaction(async (transaction) => user.save({ transaction }));
    }

    return next(new ResponseError(message, UNAUTHORIZED));
  }
}
