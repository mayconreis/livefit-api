import { Router } from 'express';
import validateSchema from '@src/http/middlewares/joi/validateSchema';
import { ESchemaType } from '@src/shared/enums';
import { UserRepository } from '@src/modules/users/sequelize';
import { createSolicitaionSchema } from '../solicitationSchema';
import { CreateSolicitationService, GetSolicitationsService } from '../services';
import { SolicitationRepository } from '../sequelize';
import { CreateSolicitationController, GetSolicitationsController } from '../controllers';

const solicitationRepository = new SolicitationRepository();
const userRepository = new UserRepository();

const solicitationRoutes = Router();

solicitationRoutes.get('/', (req, res, next) => {
  const service = new GetSolicitationsService(solicitationRepository);
  const controller = new GetSolicitationsController(service);
  return controller.handle(req, res, next);
});

solicitationRoutes.post('/', validateSchema(createSolicitaionSchema, ESchemaType.BODY), (req, res, next) => {
  const service = new CreateSolicitationService(solicitationRepository, userRepository);
  const controller = new CreateSolicitationController(service);
  return controller.handle(req, res, next);
});

export default solicitationRoutes;
