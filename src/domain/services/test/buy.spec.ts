import { Repository } from 'typeorm';
import { Buy } from '../../entities/buy.entity';
import { BuyService } from '../buy.service';
import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { outputBuy, outputProduct } from './test-dtos';
import { ProductService } from '../product.service';
import { Product } from '../../entities/product.entity';


describe('Buy service test', () => {
  let buyRepositoryOrm: Repository<Buy>;
  let buyService: BuyService;
  let productRepositoryOrm: Repository<Product>;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [
        BuyService,
        {
          provide: getRepositoryToken(Buy),
          useValue: {
            create: jest.fn().mockResolvedValue(outputBuy),
            save: jest.fn().mockResolvedValue(outputBuy),
            find: jest.fn().mockResolvedValue([outputBuy]),
            remove: jest.fn().mockResolvedValue(undefined),
            preload: jest.fn().mockResolvedValue(outputBuy),
            findOneBy: jest.fn().mockResolvedValue(outputBuy)
          },
        },
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            create: jest.fn().mockResolvedValue(outputProduct),
            save: jest.fn().mockResolvedValue(outputProduct),
            find: jest.fn().mockResolvedValue([outputProduct]),
            remove: jest.fn().mockResolvedValue(undefined),
            preload: jest.fn().mockResolvedValue(outputProduct),
            findOneBy: jest.fn().mockResolvedValue(outputProduct)
          },
        },
      ],
    }).compile();

    buyRepositoryOrm = module.get<Repository<Buy>>(
      getRepositoryToken(Buy),
    );
    buyService = module.get<BuyService>(BuyService);
    productRepositoryOrm = module.get<Repository<Product>>(
        getRepositoryToken(Product),
      );
      productService = module.get<ProductService>(ProductService);
  });

  it('Should be service define', () => {
    expect(buyService).toBeDefined();
    expect(buyRepositoryOrm).toBeDefined();

    expect(productService).toBeDefined();
    expect(productRepositoryOrm).toBeDefined();

  });

  it('Should be buy created', () => {
    const res = buyService.create(outputBuy);
    const createRepositorySpy = jest.spyOn(buyRepositoryOrm, 'create');
    const saveRepositorySpy = jest.spyOn(buyRepositoryOrm, 'save');
    expect(res).toBeDefined();
    expect(createRepositorySpy).toBeCalledTimes(1);
  });

  it('Should get buys paginated', () => {
    const res = buyService.findAll({ limit: 10 , offset: 0 });
    const findRepositorySpy = jest.spyOn(buyRepositoryOrm, 'find');
    expect(res).toBeDefined();
    expect(findRepositorySpy).toBeCalledTimes(1);
    expect(res).resolves.toEqual([outputBuy]);
  });

  it('Should get one buy', () => {
    const res = buyService.findOne(outputProduct.id);
    const findRepositorySpy = jest.spyOn(buyRepositoryOrm, 'findOneBy');
    expect(res).toBeDefined();
    expect(findRepositorySpy).toBeCalledTimes(1);
    expect(res).resolves.toEqual(outputBuy);
  });

  it('Should be buy updated', () => {
    const res = buyService.update(outputProduct.id, outputProduct);
    const preloadRepositorySpy = jest.spyOn(buyRepositoryOrm, 'preload');
    expect(res).toBeDefined();
    expect(preloadRepositorySpy).toBeCalledTimes(1);
    expect(res).resolves.toEqual(outputBuy);
  });

  it('Should be buy deleted', () => {
    const res = buyService.remove(outputProduct.id);
    const findOnerepositorySpy = jest.spyOn(buyRepositoryOrm, 'findOneBy');
    expect(res).toBeDefined();
    expect(findOnerepositorySpy).toBeCalledTimes(1);       
  });

});
