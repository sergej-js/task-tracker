import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { TaskWithExecutors } from './types';

@Injectable()
export class TasksService {
    constructor(private readonly prismaService: PrismaService) { }

    async create(dto: CreateTaskDto): Promise<TaskWithExecutors> {
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
                    include: {
                        user: true,
                    }
                }
            }
        })
    }

    async update(id: number, dto: UpdateTaskDto): Promise<TaskWithExecutors> {
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
                    include: {
                        user: true,
                    }
                }
            }
        })
    }

    async findById(id: number): Promise<TaskWithExecutors> {
        return await this.prismaService.task.findFirst({
            where: {
                id,
            },
            include: {
                executors: {
                    include: {
                        user: true,
                    }
                }
            }
        })
    }

    async findAll(): Promise<TaskWithExecutors[]> {
        return await this.prismaService.task.findMany({
            include: {
                executors: {
                    include: {
                        user: true,
                    }
                }
            }
        })
    }

    async delete(id: number): Promise<TaskWithExecutors> {
        return await this.prismaService.task.delete({
            where: {
                id,
            },
            include: {
                executors: {
                    include: {
                        user: true,
                    }
                }
            },
        })
    }
}
