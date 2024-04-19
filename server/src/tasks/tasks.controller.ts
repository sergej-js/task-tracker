import { Body, Controller, Get, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { TASKS_NOT_FOUND_MESSAGE, TASK_NOT_FOUND_MESSAGE } from './consts';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TasksService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllTasks() {
        const tasks = await this.taskService.findAll();
        if (tasks.length < 1) {
            throw new NotFoundException(TASKS_NOT_FOUND_MESSAGE)
        }
        return tasks;
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getTask(@Param('id') id: number) {
        const task = await this.taskService.findOne(+id);
        if (!task) {
            throw new NotFoundException(TASK_NOT_FOUND_MESSAGE(id));
        }
        return task;
    }

    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Post()
    createTask(@Body() dto: CreateTaskDto) {
        return this.taskService.create(dto);
    }

    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateTask(@Param('id') id: number, @Body() dto: UpdateTaskDto) {
        return this.taskService.update(+id, dto);
    }
}