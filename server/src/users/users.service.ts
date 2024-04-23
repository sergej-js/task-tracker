import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { CreateUserDto } from "src/auth/dto/register.dto";
import { PrismaService } from "src/common/database/prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) { }

    async findById(id: number): Promise<User> {
        const user = await this.prismaService.user.findFirst({
            where: {
                id,
            },
        });
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.prismaService.user.findFirst({
            where: {
                email,
            },
        });
        return user;
    }

    async create(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
        const user = await this.prismaService.user.create({
            data: {
                email: dto.email,
                name: dto.name,
                password: dto.password,
            }
        });
        delete user.password;
        return user;
    }

    async update(id: number, dto: UpdateUserDto) {
        const user = await this.prismaService.user.update({
            where: {
                id,
            },
            data: dto
        })
        return user;
    }
}