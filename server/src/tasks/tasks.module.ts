import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { TasksService } from './tasks.service';
import { TaskController } from './tasks.controller';

@Module({
  imports: [PrismaModule],
  controllers: [TaskController],
  providers: [TasksService],
})
export class TasksModule {}
