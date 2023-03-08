import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ProductService } from '../../domain/services/product.service';
import { ProductsController } from '../../application/controllers/product.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
