import { Pool } from 'pg';
import { Task, TaskInput } from '../types';

export class TaskService {
    private db: Pool;

    constructor() {
        this.db = new Pool({
            user: 'your_db_user',
            host: 'localhost',
            database: 'your_db_name',
            password: 'your_db_password',
            port: 5432,
        });
    }

    async addTask(taskInput: TaskInput): Promise<Task> {
        const { title, category } = taskInput;
        const result = await this.db.query(
            'INSERT INTO tasks (title, category, completed, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, category, false, new Date()]
        );
        return result.rows[0];
    }

    async toggleTask(id: number): Promise<Task> {
        const result = await this.db.query(
            'UPDATE tasks SET completed = NOT completed WHERE id = $1 RETURNING *',
            [id]
        );
        return result.rows[0];
    }

    async loadTasks(): Promise<Task[]> {
        const result = await this.db.query('SELECT * FROM tasks ORDER BY created_at DESC');
        return result.rows;
    }
}