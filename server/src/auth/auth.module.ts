import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccessStrategy } from './guards/access.strategy';
import { UsersModule } from 'src/users/users.module';
import { RefreshStrategy } from './guards/refresh.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, AccessStrategy, RefreshStrategy],
})
export class AuthModule { }
