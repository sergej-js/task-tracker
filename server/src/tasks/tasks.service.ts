import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable()
export class TasksService {
    constructor(private readonly prismaService: PrismaService) { }

    async create(dto: CreateTaskDto): Promise<Task> {
        return await this.prismaService.task.create({
            data: {
                title: dto.title,
                deadline: new Date(dto.deadline),
                priority: dto.priority,
                executors: {
                    create: dto.executors.map(userId => ({
                        user: { connect: { id: userId } }
                    }))
                }
            },
            include: {
                executors: {
                    select: {
                        userId: true,
                    }
                }
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
                executors: {
                    create: dto.executors.map(userId => ({
                        user: { connect: { id: userId } }
                    }))
                }
            },
            include: {
                executors: {
                    select: {
                        userId: true,
                    }
                }
            }
        })
    }

    async findById(id: number): Promise<Task> {
        return await this.prismaService.task.findFirst({
            where: {
                id,
            },
            include: {
                executors: {
                    select: {
                        userId: true,
                    }
                }
            }
        })
    }

    async findAll(): Promise<Task[]> {
        return await this.prismaService.task.findMany({
            include: {
                executors: {
                    select: {
                        userId: true,
                    }
                }
            }
        })
    }

    async delete(id: number): Promise<Task> {
        return await this.prismaService.task.delete({
            where: {
                id,
            },
            include: {
                executors: {
                    select: {
                        userId: true,
                    }
                }
            },
        })
    }
}
