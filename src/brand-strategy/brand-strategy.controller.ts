import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { BrandStrategyService } from './brand-strategy.service';
import { CreateStrategyDto, UpdateStrategyDto } from './dto/create-strategy.dto';

@Controller('brand-strategies')
export class BrandStrategyController {
  constructor(private readonly brandStrategyService: BrandStrategyService) {}

  /**
   * 获取品牌策略列表
   */
  @Get()
  async findAll() {
    return this.brandStrategyService.findAll();
  }

  /**
   * 获取品牌策略详情
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.brandStrategyService.findOne(id);
  }

  /**
   * 创建品牌策略
   */
  @Post()
  async create(@Body() createStrategyDto: CreateStrategyDto) {
    return this.brandStrategyService.create(createStrategyDto);
  }

  /**
   * 更新品牌策略
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStrategyDto: UpdateStrategyDto,
  ) {
    return this.brandStrategyService.update(id, updateStrategyDto);
  }

  /**
   * 删除品牌策略
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.brandStrategyService.remove(id);
  }

  /**
   * 获取医生的观念阶梯分群
   */
  @Get('hcp/:did/segment')
  async findHcpSegment(@Param('did') did: string) {
    return this.brandStrategyService.findHcpSegment(did);
  }

  /**
   * 获取品牌策略下的观念阶梯分群
   */
  @Get(':id/segments')
  async findSegmentsByStrategy(@Param('id') strategyId: string) {
    return this.brandStrategyService.findSegmentsByStrategy(strategyId);
  }

  /**
   * 获取障碍点字典
   */
  @Get('barriers/dictionary')
  async findBarrierDictionary() {
    return this.brandStrategyService.findBarrierDictionary();
  }
}
