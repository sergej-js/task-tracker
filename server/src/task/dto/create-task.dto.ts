import { IsDateString, IsEmpty, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsEmpty()
    title: string;

    @IsDateString()
    @IsEmpty()
    deadline: string;
}