import { Router } from 'express';

import SessionsController from '@modules/users/infra/http/controllers/SessionsController';

const sessionsRouter = Router();
const sessionController = new SessionsController();

sessionsRouter.post('/', sessionController.create);

export default sessionsRouter;
