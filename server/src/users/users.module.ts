import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/database/prisma.module';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
