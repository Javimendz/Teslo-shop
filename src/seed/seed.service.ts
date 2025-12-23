import { Injectable } from '@nestjs/common';
import { Product } from 'src/products/entities';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';




@Injectable()
export class SeedService {

   constructor(private readonly productsService: ProductsService) {}

  async runSeed() {
    await this.insertNewProducts();
    return 'SEED EXECUTED';
  }

  private async insertNewProducts() {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;

    // 1. Map each product to a Create Promise
    // TypeScript will automatically infer this as Promise<Product>[]
    const insertPromises = products.map(product => 
      this.productsService.create(product)
    );

    // 2. Execute all promises in parallel
    await Promise.all(insertPromises);

    return true;
  }
}
