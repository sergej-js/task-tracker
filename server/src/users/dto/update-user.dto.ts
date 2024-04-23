import { UserRole } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    name?: string

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;

    @IsNotEmpty()
    @IsOptional()
    refreshToken?: string;
}
