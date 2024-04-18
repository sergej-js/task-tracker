import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { TaskService } from './task.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [TaskService],
})
export class AppModule {}
