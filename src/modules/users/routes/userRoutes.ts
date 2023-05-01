import { Router } from 'express';
import validateSchema from '@src/http/middlewares/joi/validateSchema';
import { EncryptHelper } from '@src/helpers';
import { ESchemaType } from '@src/shared/enums';
import auth from '@src/http/middlewares/auth';
import { UserRepository } from '../sequelize';
import { createUserSchema, updateUserSchema } from '../userSchema';
import { CreateUserService, GetUserService, GetUsersService, UpdateUserService } from '../services';
import {
  CreateUserController,
  GetProfileController,
  GetUsersController,
  UpdateUserController,
  GetUserController,
} from '../controllers';

const userRoutes = Router();

const userRepository = new UserRepository();
userRoutes.post('/', validateSchema(createUserSchema, ESchemaType.BODY), (req, res, next) => {
  const service = new CreateUserService(userRepository, EncryptHelper);
  const controller = new CreateUserController(service);
  return controller.handle(req, res, next);
});

userRoutes.patch('/:id', auth, validateSchema(updateUserSchema, ESchemaType.BODY), (req, res, next) => {
  const service = new UpdateUserService(userRepository);
  const controller = new UpdateUserController(service);
  return controller.handle(req, res, next);
});

userRoutes.get('/profile', auth, (req, res, next) => {
  const service = new GetUserService(userRepository);
  const controller = new GetProfileController(service);
  return controller.handle(req, res, next);
});

userRoutes.get('/', auth, (req, res, next) => {
  const service = new GetUsersService(userRepository);
  const controller = new GetUsersController(service);
  return controller.handle(req, res, next);
});

userRoutes.get('/:id', auth, (req, res, next) => {
  const service = new GetUserService(userRepository);
  const controller = new GetUserController(service);
  return controller.handle(req, res, next);
});

export default userRoutes;
