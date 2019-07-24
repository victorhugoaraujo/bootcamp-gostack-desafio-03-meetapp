import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddlewares from './app/middlewares/auth';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import SubscriptionController from './app/controllers/SubscriptionController';

const routes = new Router();
const uploads = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddlewares);

routes.put('/users', UserController.update);
routes.post('/meetups', MeetupController.store);
routes.get('/meetups', MeetupController.index);
routes.delete('/meetups/:id', MeetupController.delete);
routes.put('/meetups/:id', MeetupController.update);

routes.post('/meetups/:meetupId/subscriptions', SubscriptionController.store);

routes.post('/files', uploads.single('file'), FileController.store);

export default routes;
