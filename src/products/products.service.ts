import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import {validate as isUUID} from 'uuid'
import { title } from 'process';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService')

  constructor(

    @InjectRepository(Product)
    private readonly ProductRepository: Repository<Product>,

  ){}

 async create(createProductDto: CreateProductDto) {

    try {

      /*
      if(!createProductDto.slug){
         createProductDto.slug = createProductDto.title.toLowerCase()
         .replaceAll(' ','_')
         .replaceAll("'",'')

      }else{

        createProductDto.slug = createProductDto.slug
        .toLowerCase().replaceAll(' ','_')
        .replaceAll("'",'');

      }
      */
      const product =  this.ProductRepository.create(createProductDto)
      await this.ProductRepository.save(product)

      return product;

    } catch (error) {


      this.handleException(error);
    }

}

  findAll(paginationDto: PaginationDto) {
    
      const {limit = 10, offset=0 } = paginationDto;


    return this.ProductRepository.find( {
      take: limit,
      skip: offset
      //TODO: relaciones

    });

  }

  async findOne(term: string) {
   
    let product: Product | null;

    if(isUUID(term))
      product = await this.ProductRepository.findOneBy({id: term})
    else{

     const queryBuilder = this.ProductRepository.createQueryBuilder();
       
     product = await queryBuilder
     .where('UPPER(title) =:title or slug =:slug',{
        title:term.toUpperCase(),
        slug:term.toLowerCase()

     }).getOne();
    }
      

    if(!product)
      throw new NotFoundException(`Product with ${term} not found`)

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {

   
    const product = await this.ProductRepository.preload({
      id,
      ...updateProductDto,

    });

   
    if(!product)
      throw new BadRequestException(`Product with id ${id} not found`)
     try {
          await this.ProductRepository.save(product);

    } catch (error) {
      this.handleException(error)
    }
    return  product
  }

  async remove(id: string) {

    const product =  await this.findOne(id);

    await this.ProductRepository.remove(product);

   
    return {message: 'Product deleted sucessfully'}
  }

  private handleException(error: any){

    if(error.code === '23505')
      throw new BadRequestException(error.detail)

    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs')

  }

}
