class Task {
    id: number;
    title: string;
    category: string;
    completed: boolean;
    created_at: Date;

    constructor(id: number, title: string, category: string, completed: boolean = false) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.completed = completed;
        this.created_at = new Date();
    }

    markComplete() {
        this.completed = true;
    }

    markIncomplete() {
        this.completed = false;
    }
}

export default Task;