import { Task } from "@prisma/client";
import { IsDateString, IsEmpty, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsEmpty()
    title: string;

    @IsDateString()
    @IsEmpty()
    deadline: Date;
}