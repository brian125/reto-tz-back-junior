import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { BuyService } from '../../domain/services/buy.service';
import { CreateBuyDto } from '../../domain/dtos/buy-dto/create-buy.dto';
import { PaginationDto } from '../../domain/dtos/common/pagination.dto';
import { UpdateBuyDto } from '../../domain/dtos/buy-dto/update-buy.dto';

  
  @Controller('buys')
  export class BuysController {
    constructor(private readonly buyService: BuyService) {}
  
    @Post()
    create(@Body() createBuyDto: CreateBuyDto) {
      return this.buyService.create(createBuyDto);
    }
  
    @Get()
    findAll(@Query() paginationDto: PaginationDto ) {
      return this.buyService.findAll(paginationDto);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.buyService.findOne(id);
    }
  
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateBuyDto: UpdateBuyDto,
    ) {
      return this.buyService.update(id, updateBuyDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.buyService.remove(id);
    }
  }
  