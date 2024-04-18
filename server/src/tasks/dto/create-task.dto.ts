import { TaskPriority } from "@prisma/client";
import { IsDateString, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDateString({ strict: false })
    @IsNotEmpty()
    deadline: Date;

    @IsEnum(TaskPriority)
    @IsNotEmpty()
    priority: TaskPriority;
}