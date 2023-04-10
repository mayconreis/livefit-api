import { Router } from 'express';
import userRoutes from '@src/modules/users/routes/userRoutes';
import authenticateRoutes from '@src/modules/authenticate/routes/authenticateRoutes';

const masterRoutes = Router();

masterRoutes.use('/users', userRoutes);
masterRoutes.use('/auth', authenticateRoutes);

export default masterRoutes;
