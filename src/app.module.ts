import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
<<<<<<< HEAD
import { AuthModule } from './auth/auth.module';
=======
import { FilesModule } from './files/files.module';
>>>>>>> 06867ed7af012106ba3468e4da8258b61f8090d5


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

    CommonModule,

    SeedModule,

<<<<<<< HEAD
    AuthModule,
=======
    FilesModule,
>>>>>>> 06867ed7af012106ba3468e4da8258b61f8090d5


  ],
  

})
export class AppModule {}
