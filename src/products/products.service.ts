import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import {validate as isUUID} from 'uuid'
import { title } from 'process';
import { ProductImage, Product } from './entities';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService')

  constructor(

    @InjectRepository(Product)
    private readonly ProductRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly ProductImageRepository: Repository<ProductImage>,

    private readonly dataSource: DataSource,
  ){}

 async create(createProductDto: CreateProductDto) {

    try {

      const { images = [], ...productDetails} = createProductDto;


  
      const product =  this.ProductRepository.create({
        ...productDetails,
        images: images.map( image  => this.ProductImageRepository.create({url: image}))
    });
      await this.ProductRepository.save(product)

      return {...product, images};

    } catch (error) {


      this.handleException(error);
    }

}

  async findAll(paginationDto: PaginationDto) {
    
      const {limit = 10, offset=0 } = paginationDto;


    const products = await this.ProductRepository.find( {
      take: limit,
      skip: offset,
      //TODO: relaciones
      relations: {

        images: true

      }
    })

     return products.map( ({images, ...rest}) => ({

      ...rest,
      images: images.map(img => img.url)

     }))

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

     }).leftJoinAndSelect('prod.images',' prodImages')
     .getOne();
    }
      

    if(!product)
      throw new NotFoundException(`Product with ${term} not found`)

    return product ;
  }

  async findOnePlain(term: string){

    const {images = [], ...rest}  = await this.findOne(term)
    return {
      ...rest,
      images: images.map( image => image.url)

    }

  }

  async update(id: string, updateProductDto: UpdateProductDto) {

   
    const { images, ...toUpdate} = updateProductDto;


    const product = await this.ProductRepository.preload({
      id,
      ...toUpdate,
      

    });

   
    if(!product)
      throw new BadRequestException(`Product with id ${id} not found`)

    //Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();





     try {


        if(images){
          await queryRunner.manager.delete(ProductImage, {product: {id}})
          product.images = images.map(image => this.ProductImageRepository.create( {url:image}))
        }else{


        }

        await queryRunner.manager.save(product);
        await queryRunner.commitTransaction();
        await queryRunner.release();
        
        return this.findOnePlain(id);

    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleException(error);
    }
    
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


  async deleteAllProducts(){

    const query = this.ProductImageRepository.createQueryBuilder('product');

    try{
      return await query.delete().where({}).execute();
    }catch(error){
      this.handleException(error);
    }

  }

}
