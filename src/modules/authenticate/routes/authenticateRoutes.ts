import { Router } from 'express';
import validateSchema from '@src/http/middlewares/joi/validateSchema';
import { UserRepository } from '@src/modules/users/sequelize';
import { EncryptHelper, JWTHelper } from '@src/helpers';
import { ESchemaType } from '@src/shared/enums';
import encryptHelper from '@src/helpers/EncryptHelper';
import { LoginController, LogoutController } from '../controllers';
import { LoginService, LogoutService } from '../services';
import authenticateSchema from '../authenticateSchema';

const authenticateRoutes = Router();

const userRepository = new UserRepository();

authenticateRoutes.post('/login', validateSchema(authenticateSchema, ESchemaType.BODY), (req, res, next) => {
  const service = new LoginService(userRepository, JWTHelper, EncryptHelper);
  const controller = new LoginController(service);
  return controller.handle(req, res, next);
});

authenticateRoutes.post('/logout', (req, res, next) => {
  const service = new LogoutService(userRepository, encryptHelper);
  const controller = new LogoutController(service);
  return controller.handle(req, res, next);
});

export default authenticateRoutes;
