import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
