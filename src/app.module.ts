import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
<<<<<<< HEAD
import { CommonModule } from './common/common.module';
=======
>>>>>>> a934d5a9e9047fa248f6766e2aecee74fe49883e


@Module({
  imports: [ConfigModule.forRoot(),

    TypeOrmModule.forRoot({

        type: 'postgres',
        host: process.env.DB_HOST,
        port:  5432,
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        autoLoadEntities: true,
        synchronize: true,


    }),

    ProductsModule,

<<<<<<< HEAD
    CommonModule,

=======
>>>>>>> a934d5a9e9047fa248f6766e2aecee74fe49883e

  ],
  

})
export class AppModule {}
