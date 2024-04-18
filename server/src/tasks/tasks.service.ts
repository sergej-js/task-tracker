import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(dto: CreateTaskDto): Promise<Task> {
        return await this.prismaService.task.create({
            data: {
                title: dto.title,
                deadline: new Date(dto.deadline),
                priority: dto.priority
            }
        })
    }

    async update(id: number, dto: UpdateTaskDto): Promise<Task> {
        return await this.prismaService.task.update({
            where: {
                id,
            },
            data: {
                title: dto.title,
                deadline: dto.deadline,
                status: dto.status,
                priority: dto.priority,
            }
        })
    }

    async findOne(id: number): Promise<Task> {
        return await this.prismaService.task.findFirst({
            where: {
                id,
            }
        })
    }

    async findAll(): Promise<Task[]> {
        return await this.prismaService.task.findMany()
    }
}