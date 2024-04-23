import { Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AccessTokenGuard } from 'src/auth/guards/access.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { TASKS_NOT_FOUND_MESSAGE, TASK_NOT_FOUND_MESSAGE } from './consts';
import { TransformInterceptor } from 'src/common/interceptors/response.interceptor';
import { Task } from '@prisma/client';
import { ExecutorEntity, TaskEntity } from './entities/tasks.entity';

@UseInterceptors(new TransformInterceptor<Task | Task[]>())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TasksService) {}

    @UseGuards(AccessTokenGuard)
    @Get()
    async getAllTasks() {
        const tasks = await this.taskService.findAll();
        if (tasks.length < 1) {
            throw new NotFoundException(TASKS_NOT_FOUND_MESSAGE)
        }
        return tasks.map((v) => (new TaskEntity({
            id: v.id,
            title: v.title,
            status: v.status,
            priority: v.priority,
            deadline: v.deadline,
            createdAt: v.createdAt,
            updatedAt: v.updatedAt,
            executors: v.executors.map((d) => (new ExecutorEntity({ assignedAt: d.assignedAt, ...d.user })))
        })));
    }

    @UseGuards(AccessTokenGuard)
    @Get(':id')
    async getTaskById(@Param('id') id: number) {
        const task = await this.taskService.findById(+id);
        if (!task) {
            throw new NotFoundException(TASK_NOT_FOUND_MESSAGE(id));
        }
        return new TaskEntity({
            id: task.id,
            title: task.title,
            status: task.status,
            priority: task.priority,
            deadline: task.deadline,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
            executors: task.executors.map((v) => (new ExecutorEntity({ assignedAt: v.assignedAt, ...v.user })))
        });
    }

    @Roles('ADMIN')
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Post()
    async createTask(@Body() dto: CreateTaskDto) {
        const task = await this.taskService.create(dto)
        return new TaskEntity({
            id: task.id,
            title: task.title,
            status: task.status,
            priority: task.priority,
            deadline: task.deadline,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
            executors: task.executors.map((v) => (new ExecutorEntity({ assignedAt: v.assignedAt, ...v.user })))
        });
    }

    @Roles('ADMIN')
    @UseGuards(AccessTokenGuard)
    @Patch(':id')
    async updateTask(@Param('id') id: number, @Body() dto: UpdateTaskDto) {
        const task = await this.taskService.update(+id, dto);
        return new TaskEntity({
            id: task.id,
            title: task.title,
            status: task.status,
            priority: task.priority,
            deadline: task.deadline,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
            executors: task.executors.map((v) => (new ExecutorEntity({ assignedAt: v.assignedAt, ...v.user })))
        });
    }

    @Roles('ADMIN')
    @UseGuards(AccessTokenGuard)
    @Delete(':id')
    async deleteTask(@Param('id') id: number) {
        const task = await this.taskService.delete(+id);
        return new TaskEntity({
            id: task.id,
            title: task.title,
            status: task.status,
            priority: task.priority,
            deadline: task.deadline,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
            executors: task.executors.map((v) => (new ExecutorEntity({ assignedAt: v.assignedAt, ...v.user })))
        });
    }
}