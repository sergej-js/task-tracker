import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskController } from './tasks.controller';
import { PrismaModule } from 'src/common/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TaskController],
  providers: [TasksService],
})
export class TasksModule {}
