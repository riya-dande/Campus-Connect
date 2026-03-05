import { Router } from 'express';
import TasksController from '../controllers/tasksController';

const router = Router();
const tasksController = new TasksController();

router.post('/tasks', tasksController.addTask.bind(tasksController));
router.get('/tasks', tasksController.loadTasks.bind(tasksController));
router.patch('/tasks/:id/toggle', tasksController.toggleTask.bind(tasksController));

export default function setRoutes(app) {
    app.use('/api', router);
}