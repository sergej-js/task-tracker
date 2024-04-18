import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TasksService) {}

    @Get()
    getAllTasks() {
        return this.taskService.findAll();
    }

    @Get(':id')
    getTask(@Param('id') id: number) {
        return this.taskService.findOne(+id);
    }

    @Post()
    createTask(@Body() dto: CreateTaskDto) {
        return this.taskService.create(dto);
    }

    @Patch(':id')
    updateTask(@Param('id') id: number, @Body() dto: UpdateTaskDto) {
        return this.taskService.update(+id, dto);
    }
}