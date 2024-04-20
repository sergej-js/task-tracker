import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { INVALID_CREDENTIALS_ERROR, USER_EXISTS_ERROR, USER_NOT_FOUND_ERROR } from './consts';
@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) { }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.usersService.findByEmail(email);

        if(!user) {
            throw new NotFoundException(USER_NOT_FOUND_ERROR);
        }

        const validatePassword = await bcrypt.compare(password, user.password);

        if (!validatePassword) {
            throw new UnauthorizedException(INVALID_CREDENTIALS_ERROR);
        }

        delete user.password;
        return {
            access_token: this.jwtService.sign({
                email,
                role: user.role,
            }),
            user
        }
    }

    async register(createUserDto: CreateUserDto) {
        const existing = await this.usersService.findByEmail(createUserDto.email);

        if(existing) {
            throw new ConflictException(USER_EXISTS_ERROR);
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        createUserDto.password = hashedPassword;
        const user = await this.usersService.create(createUserDto)

        return {
            access_token: this.jwtService.sign({ email: user.email, role: user.role }),
            user
        }
    }
}