import { Injectable } from '@nestjs/common';
import { Product } from 'src/products/entities';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';




@Injectable()
export class SeedService {

    constructor( private readonly productsService: ProductsService){}

  async runSeed(){

    return 'SEED EXECUTED'
  }

  private async insertNewProducts(){

    //this.productsService.deleteAllProducts();
   await this.productsService.deleteAllProducts();

    const products = initialData.products;

    const inserPromises = [];

    products.forEach(product =>{

      inserPromises.push(this.productsService.create(product))

    });

    const  results = await Promise.all(inserPromises);


    return true;

  }

}
