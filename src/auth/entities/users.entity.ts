import { IsBoolean, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity('users')
export class User {


    @PrimaryGeneratedColumn()
    id: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @Column('text', { unique: true})
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @Column('text')
    password:string;

    @IsString()
    @IsNotEmpty()
    @Column('text')
    fullName: string;

    @IsBoolean()
    @IsNotEmpty()
    @Column('bool', {default: true})
    isActive: boolean;

    @IsString()
    @MinLength(1)
    @Column('text', {array:true, default: ['user']})
    roles: string[];


}
