import { ConflictException, ForbiddenException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { INVALID_CREDENTIALS_ERROR, ACCESS_DENIED, USER_EXISTS_ERROR, USER_NOT_FOUND_ERROR } from './consts';
import { UserRole } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { Config } from 'src/common/config/config';
@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService, private readonly configService: ConfigService<Config, true>) { }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new NotFoundException(USER_NOT_FOUND_ERROR);
        }

        const validatePassword = await bcrypt.compare(password, user.password);

        if (!validatePassword) {
            throw new UnauthorizedException(INVALID_CREDENTIALS_ERROR);
        }

        const tokens = await this.getTokens(user.id, user.role);
        await this.updateRefreshToken(user.id, tokens.refreshToken)

        return tokens;
    }

    async register(createUserDto: CreateUserDto) {
        const existing = await this.usersService.findByEmail(createUserDto.email);

        if (existing) {
            throw new ConflictException(USER_EXISTS_ERROR);
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        createUserDto.password = hashedPassword;
        const user = await this.usersService.create(createUserDto)

        const tokens = await this.getTokens(user.id, user.role);
        await this.updateRefreshToken(user.id, tokens.refreshToken)

        return tokens;
    }

    async logout(id: number) {
        return this.usersService.update(id, { refreshToken: null });
    }

    async updateRefreshToken(id: number, refreshToken: string) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)
        await this.usersService.update(id, {
            refreshToken: hashedRefreshToken,
        })
    }

    async refreshTokens(id: number, refreshToken: string) {
        const user = await this.usersService.findById(id);
        if (!user || !user.refreshToken)
            throw new ForbiddenException(ACCESS_DENIED);
        const refreshTokenMatches = await bcrypt.compare(
            refreshToken,
            user.refreshToken,
        );
        if (!refreshTokenMatches) throw new ForbiddenException(ACCESS_DENIED);
        const tokens = await this.getTokens(user.id, user.role);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }

    async getTokens(userId: number, role: UserRole) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    role,
                },
                {
                    secret: this.configService.get<string>('JWT_SECRET'),
                    expiresIn: '1h',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    role,
                },
                {
                    secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                    expiresIn: '7d',
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}