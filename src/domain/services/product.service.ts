import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto } from '../dtos/product-dto/create-product.dto';

import { PaginationDto } from '../dtos/common/pagination.dto';
import { UpdateProductDto } from '../dtos/product-dto/update-product.dto';

import { Product } from '../entities/product.entity';
import { validate as isUUID } from 'uuid';

@Injectable()
export class ProductService {
  private readonly logger = new Logger('ProductService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {

      if (createProductDto.min > createProductDto.max) {
        return `La cantidad minima debe ser menor o igual a la cantidad maxima`;
      }

      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit  , offset } = paginationDto;

    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
    })

    return { products, 'totalElements':  (await this.productRepository.find()).length }
  }

  async findOne(id: string) {
    let product: Product;
    if (isUUID(id)) {
      product = await this.productRepository.findOneBy({ id: id });
    }
    if (!product) throw new NotFoundException(`Product with ${id} not found`);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productRepository.preload({
        id: id,
        ...updateProductDto,
      });

      if (product.inInventory > 0) {
        product.enabled = true;
      }

      if (+product.min > +product.max) {
        return `La cantidad minima debe ser menor o igual a la cantidad maxima`;
      }

      if (!product) {
        throw new NotFoundException(`Product with id: ${id} not found`);
      }

      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const product = await this.findOne(id);
      console.log(product);
      return await this.productRepository.remove(product);
    } catch (error) {
      return;
    }
  }

  async validateInventaryQuantity(id: string, quantity: number) {
    try {
      const product = await this.productRepository.findOneBy({ id });

      if (product.inInventory < quantity) {
        return ` La cantidad en inventario *${+product.inInventory}* es menor a la cantidad solicitada *${quantity}*`;
      }
      product.inInventory = product.inInventory - quantity;

      if (product.inInventory === 0) {
        product.enabled = false;
      }

      this.update(id, product);
      return product;
    } catch (error) {
      throw new BadRequestException(
        `La cantidad de productos en inventario no puede ser mayor al maximo`,
      );
    }
  }

  async validateMinQuantity(id: string, quantity: number) {
    try {
      const product = await this.productRepository.findOneBy({ id });

      if (+product.min > quantity) {
        return false;
      }
      return true;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async validateMaxQuantity(id: string, quantity: number) {
    try {
      const product = await this.productRepository.findOneBy({ id });
      if (+product.max < quantity) {
        return false;
      }
      return true;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async validateEnabled(id: string) {
    try {
      const product = await this.productRepository.findOneBy({ id });
      if (!product.enabled) {
        return false;
      }
      return true;
    } catch (error) {
      this.logger.error(error);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
