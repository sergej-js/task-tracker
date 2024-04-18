import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TasksService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllTasks() {
        return this.taskService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getTask(@Param('id') id: number) {
        return this.taskService.findOne(+id);
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