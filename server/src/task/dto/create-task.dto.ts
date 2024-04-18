import { Task } from "@prisma/client";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDateString({ strict: false })
    @IsNotEmpty()
    deadline: Date;
}