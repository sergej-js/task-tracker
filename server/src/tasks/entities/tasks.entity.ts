import { Task, TaskPriority, TaskStatus, User, UserRole } from "@prisma/client";
import { Exclude } from "class-transformer";

export class ExecutorEntity implements Omit<User, 'password' | 'refreshToken'> {
    assignedAt: Date;
    id: number;
    name: string;
    email: string;

    @Exclude()
    password: string;

    @Exclude()
    refreshToken: string;

    role: UserRole;
    createdAt: Date;
    updatedAt: Date;

    constructor(partial: Partial<ExecutorEntity>) {
        Object.assign(this, partial);
    }
}

export class TaskEntity implements Task {
    id: number;
    title: string;
    status: TaskStatus;
    priority: TaskPriority;
    deadline: Date;
    createdAt: Date;
    updatedAt: Date;

    executors: ExecutorEntity | ExecutorEntity[];

    constructor(partial: Partial<TaskEntity>) {
        Object.assign(this, partial);
    }
}