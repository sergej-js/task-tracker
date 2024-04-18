import { TaskStatus } from "@prisma/client";
import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsDateString({ strict: false })
    @IsOptional()
    deadline?: Date;

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;

}