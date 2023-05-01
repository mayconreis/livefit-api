import { Router } from 'express';
import userRoutes from '@src/modules/users/routes/userRoutes';
import authenticateRoutes from '@src/modules/authenticate/routes/authenticateRoutes';
import routineRoutes from '@src/modules/routines/routes/routineRoutes';
import auth from '@src/http/middlewares/auth';

const masterRoutes = Router();

masterRoutes.use('/users', userRoutes);
masterRoutes.use('/auth', authenticateRoutes);
masterRoutes.use('/routines', auth, routineRoutes);

export default masterRoutes;
