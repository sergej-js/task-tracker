import { TaskPriority } from "@prisma/client";
import { ArrayMinSize, ArrayNotEmpty, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDateString()
    @IsNotEmpty()
    deadline: Date;

    @IsEnum(TaskPriority)
    @IsNotEmpty()
    priority: TaskPriority;

    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @IsNumber({}, { each: true })
    executors: number[]
}