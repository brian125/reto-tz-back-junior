import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BuyModule } from './infrastructure/modules/buy.module';
import { ProductModule } from './infrastructure/modules/product.module';

@Module({
  imports: [ProductModule, BuyModule, ConfigModule.forRoot()],
})
export class AppModule {}
