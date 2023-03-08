import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BuyService } from '../../domain/services/buy.service';
import { BuysController } from '../../application/controllers/buy.controller';
import { ProductService } from 'src/domain/services/product.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BuysController],
  providers: [BuyService, ProductService],
  exports: [BuyService, ProductService],
})
export class BuyModule {}
