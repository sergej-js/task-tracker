import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/register.dto';
import { PrismaService } from 'src/common/database/prisma.service';
@Injectable()
export class AuthService {

    constructor(private readonly prismaService: PrismaService, private readonly jwtService: JwtService) { }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.prismaService.user.findFirst({
            where: { 
                email,
            },
        });

        if(!user) {
            throw new NotFoundException('user not found');
        }

        const validatePassword = await bcrypt.compare(password, user.password);

        if (!validatePassword) {
            throw new UnauthorizedException('invalid password');
        }

        delete user.password;
        return {
            token: this.jwtService.sign({
                email,
                role: user.role,
            }),
            user
        }
    }

    async register(createUserDto: CreateUserDto) {
        const existing = await this.prismaService.user.findFirst({
            where: {
                email: createUserDto.email
            }
        });

        if(existing) {
            throw new ConflictException('email already exists');
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        const user = await this.prismaService.user.create({
            data: {
                email: createUserDto.email,
                name: createUserDto.name,
                password: hashedPassword
            }
        });

        delete user.password;
        return {
            token: this.jwtService.sign({ email: user.email, role: user.role }),
            user
        }
    }
}