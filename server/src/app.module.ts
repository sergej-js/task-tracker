import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
