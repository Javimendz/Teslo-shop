import { Injectable } from '@nestjs/common';
import { Product } from 'src/products/entities';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';




@Injectable()
export class SeedService {

    constructor( private readonly productsService: ProductsService){}

  async runSeed(){

    await this.insertNewProducts();
    return 'SEED EXECUTED'
  }

  private async insertNewProducts(){

    //this.productsService.deleteAllProducts();
   await this.productsService.deleteAllProducts();

<<<<<<< HEAD
    const products = initialData.products;

    const inserPromises = [];

    products.forEach(product =>{

      inserPromises.push(this.productsService.create(product))

    });

    const  results = await Promise.all(inserPromises);


=======
   const products = initialData.products;
   const insertPromises = [];
   products.forEach( product => {
    insertPromises.push(this.productsService.create(product))
   })
     await Promise.all(insertPromises)
>>>>>>> 06867ed7af012106ba3468e4da8258b61f8090d5
    return true;

  }

}
