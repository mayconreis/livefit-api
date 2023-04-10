import { Router } from 'express';
import validateSchema from '@src/http/middlewares/joi/validateSchema';
import { EncryptHelper } from '@src/helpers';
import { ESchemaType } from '@src/shared/enums';
import auth from '@src/http/middlewares/auth';
import { UserRepository } from '../sequelize';
import { createUserSchema } from '../userSchema';
import { CreateUserService, GetUserService } from '../services';
import { CreateUserController, GetProfileController } from '../controllers';

const userRoutes = Router();

const userRepository = new UserRepository();
userRoutes.post('/', validateSchema(createUserSchema, ESchemaType.BODY), (req, res, next) => {
  const service = new CreateUserService(userRepository, EncryptHelper);
  const controller = new CreateUserController(service);
  return controller.handle(req, res, next);
});

userRoutes.get('/profile', auth, (req, res, next) => {
  const service = new GetUserService(userRepository);
  const controller = new GetProfileController(service);
  return controller.handle(req, res, next);
});

export default userRoutes;
