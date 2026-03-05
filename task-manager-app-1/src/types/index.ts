export interface Task {
    id: number;
    title: string;
    category: string;
    completed: boolean;
    created_at: Date;
}

export interface TaskInput {
    title: string;
    category: string;
}