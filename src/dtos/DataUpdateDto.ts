import {IsEmpty, IsInt, IsNotEmpty, IsOptional, Length} from "class-validator";

export class DataUpdateDto 
{
    @Length(3, 150)
    @IsNotEmpty()
    public Name:string;
    @Length(0, 5000)
    @IsOptional()
    public Desc:string;
    @Length(0, 100)
    @IsOptional()
    public Lang: string;
    @IsInt()
    @IsOptional()
    public Star: number;
    @IsInt()
    @IsOptional()
    public Forked: number;
    @IsInt()
    @IsOptional()
    public StarToday: number;
}
