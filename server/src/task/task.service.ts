import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TaskService {
    constructor(private readonly prismaService: PrismaService) {}
}