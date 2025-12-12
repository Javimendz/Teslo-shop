import { Injectable } from '@nestjs/common';
import { Product } from 'src/products/entities';
import { ProductsService } from '../products/products.service';




@Injectable()
export class SeedService {

    constructor( private readonly productsService: ProductsService){}

  async runSeed(){

    return 'SEED EXECUTED'
  }

  private async insertNewProducts(){

    //this.productsService.deleteAllProducts();
   await this.productsService.deleteAllProducts();
    return true;

  }

}
