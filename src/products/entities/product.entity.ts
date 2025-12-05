<<<<<<< HEAD
import { IsArray } from "class-validator";
import {BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
=======
import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
>>>>>>> a934d5a9e9047fa248f6766e2aecee74fe49883e
import { UUID } from "typeorm/driver/mongodb/bson.typings.js";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique: true,
    })
    title: string;

    @Column('float',{
        default:0

    })
    price:number;

    @Column({
        type: 'text',
        nullable: true

    })
    description:string;

    @Column('text',{

        unique: true
    })
    slug:string;

    @Column('int',{
        default:0
    })
    stock:number;

    @Column('text',{

        array:true
    })
    sizes: string[];

    @Column('text')
    gender:string;

<<<<<<< HEAD
    @Column('text',{
        array: true,
        default: []

    })
    tags: string[]

=======
>>>>>>> a934d5a9e9047fa248f6766e2aecee74fe49883e
    @BeforeInsert()
    checkSlugInsert(){

      


            if(!this.slug){
                this.slug = this.title.toLowerCase()
                .replaceAll(' ','_')
                .replaceAll("'",'')

            }

            this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
        
    }

<<<<<<< HEAD
    @BeforeUpdate()
    checkSlugUpdate(){

            if(!this.slug){
                this.slug = this.title.toLowerCase()
                .replaceAll(' ','_')
                .replaceAll("'",'')

            }

            this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')

    }

=======
>>>>>>> a934d5a9e9047fa248f6766e2aecee74fe49883e
}
