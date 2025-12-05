import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { PrimaryColumn } from 'typeorm';
import { IsArray, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {


    

    @IsString()
    @MinLength(1)
    title:string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?:number;

    @IsString()
    @IsOptional()
    descripcion:string;
    
    @IsString()
    @IsOptional()
    slug?:string;
    
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?:number;

    @IsArray()
    @IsString({each:true})
    sizes:string[];

    
    @IsIn(['men','women', 'kid', 'unisex'])
    gender:string;

}
