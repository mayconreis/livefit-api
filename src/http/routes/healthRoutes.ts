import { Router } from 'express';
import { OK } from 'http-status';

const healthRoutes = Router();

healthRoutes.get('/', (req, res, _next) => res.status(OK).json({ status: 'UP!' }));

export default healthRoutes;
