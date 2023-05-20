import { Router } from 'express';
import {
  CreateRoutineController,
  GetRoutineByPatientController,
  GetRoutineController,
  GetRoutinesController,
  DeleteRoutineController,
} from '@src/modules/routines/controllers';
import validateSchema from '@src/http/middlewares/joi/validateSchema';
import createRoutineSchema from '@src/modules/routines/routineSchema';
import { ESchemaType } from '@src/shared/enums';
import { UserRepository } from '@src/modules/users/sequelize';
import { MealItemsRepository, MealOptionsRepository, MealRepository, RoutineRepository } from '../sequelize';
import { CreateRoutineService, GetRoutinesService, GetRoutineService, DeleteRoutineService } from '../services';

const routineRoutes = Router();

const routineRepository = new RoutineRepository();
const mealRepository = new MealRepository();
const mealOptionsRepository = new MealOptionsRepository();
const mealItemsRepository = new MealItemsRepository();
const userRepository = new UserRepository();

routineRoutes.get('/', (req, res, next) => {
  const service = new GetRoutinesService(routineRepository);
  const controller = new GetRoutinesController(service);
  return controller.handle(req, res, next);
});

routineRoutes.get('/:id', (req, res, next) => {
  const service = new GetRoutineService(routineRepository);
  const controller = new GetRoutineController(service);
  return controller.handle(req, res, next);
});

routineRoutes.get('/patient/:id', (req, res, next) => {
  const service = new GetRoutineService(routineRepository);
  const controller = new GetRoutineByPatientController(service);
  return controller.handle(req, res, next);
});

routineRoutes.post('/', validateSchema(createRoutineSchema, ESchemaType.BODY), (req, res, next) => {
  const service = new CreateRoutineService(
    routineRepository,
    mealRepository,
    mealOptionsRepository,
    mealItemsRepository,
    userRepository
  );
  const controller = new CreateRoutineController(service);
  return controller.handle(req, res, next);
});

routineRoutes.delete('/:id', (req, res, next) => {
  const service = new DeleteRoutineService(
    routineRepository,
    mealRepository,
    mealOptionsRepository,
    mealItemsRepository
  );
  const controller = new DeleteRoutineController(service);
  return controller.handle(req, res, next);
});

export default routineRoutes;
