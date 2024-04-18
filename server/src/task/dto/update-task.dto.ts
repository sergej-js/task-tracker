import { TaskStatus } from "@prisma/client";
import { IsDateString, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class UpdateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDateString()
    @IsNotEmpty()
    deadline: string;

    @IsEnum(TaskStatus)
    @IsNotEmpty()
    status: TaskStatus;

}