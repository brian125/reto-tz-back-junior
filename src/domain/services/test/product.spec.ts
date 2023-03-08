import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { outputProduct } from './test-dtos';

describe('Product service test', () => {
  let repositoryOrm: Repository<Product>;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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

    repositoryOrm = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
    service = module.get<ProductService>(ProductService);
  });

  it('Should be service define', () => {
    expect(service).toBeDefined();
    expect(repositoryOrm).toBeDefined();
  });

  it('Should be product created', () => {
    const res = service.create(outputProduct);
    const createRepositorySpy = jest.spyOn(repositoryOrm, 'create');
    const saveRepositorySpy = jest.spyOn(repositoryOrm, 'save');
    expect(res).toBeDefined();
    expect(createRepositorySpy).toBeCalledTimes(1);
    expect(saveRepositorySpy).toBeCalledTimes(1);
    expect(res).resolves.toEqual(outputProduct);
  });

  it('Should get products paginated', () => {
    const res = service.findAll({ limit: 10 , offset: 0 });
    const findRepositorySpy = jest.spyOn(repositoryOrm, 'find');
    expect(res).toBeDefined();
    expect(findRepositorySpy).toBeCalledTimes(1);
    expect(res).resolves.toEqual([outputProduct]);
  });

  it('Should get One product', () => {
    const res = service.findOne(outputProduct.id);
    const findRepositorySpy = jest.spyOn(repositoryOrm, 'findOneBy');
    expect(res).toBeDefined();
    expect(findRepositorySpy).toBeCalledTimes(1);
    expect(res).resolves.toEqual(outputProduct);
  });

  // TODO: FALTA EL SAVE
  it('Should be product updated', () => {
    const res = service.update(outputProduct.id, outputProduct);
    const preloadRepositorySpy = jest.spyOn(repositoryOrm, 'preload');
    expect(res).toBeDefined();
    expect(preloadRepositorySpy).toBeCalledTimes(1);
    expect(res).resolves.toEqual(outputProduct);
  });

  //TODO: FALTA EL REMOVE
  it('Should be product deleted', () => {
    const res = service.remove(outputProduct.id);
    const findOnerepositorySpy = jest.spyOn(repositoryOrm, 'findOneBy');
    expect(res).toBeDefined();
    expect(findOnerepositorySpy).toBeCalledTimes(1);       
  });

  it('Validate inventary Quantity', () => {
    const res = service.validateInventaryQuantity(outputProduct.id, 5);
    const findOneByrepositorySpy = jest.spyOn(repositoryOrm, 'findOneBy');
    expect(res).toBeDefined();
    expect(findOneByrepositorySpy).toBeCalledTimes(1);
    expect(res).resolves.toEqual(outputProduct);
  });

  it('Validate min quantity', () => {
    const res = service.validateMinQuantity(outputProduct.id, 5);
    const findOneByrepositorySpy = jest.spyOn(repositoryOrm, 'findOneBy');
    expect(res).toBeDefined();
    expect(findOneByrepositorySpy).toBeCalledTimes(1);
    expect(res).resolves.toEqual(true);
  });

  it('Validate max quantity', () => {
    const res = service.validateMaxQuantity(outputProduct.id, 5);
    const findOneByrepositorySpy = jest.spyOn(repositoryOrm, 'findOneBy');
    expect(res).toBeDefined();
    expect(findOneByrepositorySpy).toBeCalledTimes(1);
    expect(res).resolves.toEqual(true);
  });

  it('Validate enabled', () => {
    const res = service.validateEnabled(outputProduct.id);
    const findOneByrepositorySpy = jest.spyOn(repositoryOrm, 'findOneBy');
    expect(res).toBeDefined();
    expect(findOneByrepositorySpy).toBeCalledTimes(1);
    expect(res).resolves.toEqual(true);
  });

});
