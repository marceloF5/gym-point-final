import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import AnswerHelpOrderController from './app/controllers/AnswerHelpOrderController';
import CheckinController from './app/controllers/CheckinController';
import EnrollmentController from './app/controllers/EnrollmentController';
import HelpOrderController from './app/controllers/HelpOrderController';
import PlanController from './app/controllers/PlanController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.get('/users', (req, res) => res.send('users'));

routes.get('/students/:id', StudentController.indexById);
routes.get('/students/:student_id/checkins', CheckinController.indexById);
routes.post('/students/:student_id/checkins', CheckinController.store);
routes.get('/students/:student_id/help-orders', HelpOrderController.index);
routes.post('/students/:student_id/help-orders', HelpOrderController.store);

routes.use(authMiddleware);

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.indexById);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.get('/enrollments', EnrollmentController.index);
routes.get('/enrollments/:id', EnrollmentController.indexById);
routes.post('/enrollments', EnrollmentController.store);
routes.put('/enrollments/:id', EnrollmentController.update);
routes.delete('/enrollments/:id', EnrollmentController.delete);

routes.get('/help-orders', AnswerHelpOrderController.index);
routes.put('/help-orders/:id/answer', AnswerHelpOrderController.store);

export default routes;
