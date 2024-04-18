import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
