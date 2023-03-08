import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationDto } from '../dtos/common/pagination.dto';
import { CreateBuyDto } from '../dtos/buy-dto/create-buy.dto';
import { UpdateBuyDto } from '../dtos/buy-dto/update-buy.dto';

import { Buy } from '../entities/buy.entity';

import { ProductService } from './product.service';

@Injectable()
export class BuyService {
  private readonly logger = new Logger('BuyService');

  constructor(
    @InjectRepository(Buy)
    private readonly buyRepository: Repository<Buy>,
    private readonly productService: ProductService,
  ) {}

  async create(createBuyDto: CreateBuyDto) {
    try {
      const buy = this.buyRepository.create(createBuyDto);
      const productMinValidation =
        await this.productService.validateMinQuantity(
          createBuyDto.productId,
          createBuyDto.quantity,
        );
      const productMaxValidation =
        await this.productService.validateMaxQuantity(
          createBuyDto.productId,
          createBuyDto.quantity,
        );
      const productEnabledValidation =
        await this.productService.validateEnabled(createBuyDto.productId);
      if ( productMinValidation && productMaxValidation && productEnabledValidation) {
        const productToUpdateInventary =
          await this.productService.validateInventaryQuantity(
            createBuyDto.productId,
            createBuyDto.quantity,
          );
          if (productToUpdateInventary) {
            await this.buyRepository.save(buy);
            return [buy, { msg: `The product was updated` }];
          }
      }
      return 'No se pudo realizar la compra ';
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.buyRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: string) {
    let buy: Buy;
    buy = await this.buyRepository.findOneBy({ id: id });
    if (!buy) throw new NotFoundException(`Buy with ${id} not found`);
    return buy;
  }

  async update(id: string, updateBuyDto: UpdateBuyDto) {
    const buy = await this.buyRepository.preload({
      id: id,
      ...updateBuyDto,
    });

    if (!buy) throw new NotFoundException(`Buy with id: ${id} not found`);

    try {
      await this.buyRepository.save(buy);
      return buy;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const buy = await this.findOne(id);
    await this.buyRepository.remove(buy);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
