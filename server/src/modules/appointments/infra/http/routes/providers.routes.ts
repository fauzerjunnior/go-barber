import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProvidersDayAvailabilityController from '../controllers/ProvidersDayAvailabilityController';
import ProvidersMonthAvailabilityController from '../controllers/ProvidersMonthAvailabilityController';

const providersRouter = Router();

const providersController = new ProvidersController();
const providersDayAvailabilityController = new ProvidersDayAvailabilityController();
const providersMonthAvailabilityController = new ProvidersMonthAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

providersRouter.get(
  '/:provider_id/day-availability',
  providersDayAvailabilityController.index
);

providersRouter.get(
  '/:provider_id/month-availability',
  providersMonthAvailabilityController.index
);

export default providersRouter;
