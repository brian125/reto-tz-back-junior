import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../domain/entities/product.entity';
import { Buy } from '../../domain/entities/buy.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: "localhost",
      port: 5432,
      database: "RetoSofkaDB",
      username: "postgres",
      password: "SofkaSecretPassword@123",
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product, Buy]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}