export class TasksController {
    constructor(private taskService: TaskService) {}

    async addTask(req: Request, res: Response): Promise<void> {
        const { title, category } = req.body;
        try {
            const newTask = await this.taskService.createTask({ title, category });
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({ message: 'Error adding task', error });
        }
    }

    async loadTasks(req: Request, res: Response): Promise<void> {
        try {
            const tasks = await this.taskService.getTasks();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: 'Error loading tasks', error });
        }
    }

    async toggleTask(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const updatedTask = await this.taskService.toggleTaskCompletion(id);
            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(500).json({ message: 'Error toggling task', error });
        }
    }
}