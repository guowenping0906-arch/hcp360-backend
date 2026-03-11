import { Module } from '@nestjs/common';
import { BrandStrategyController } from './brand-strategy.controller';
import { BrandStrategyService } from './brand-strategy.service';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [BrandStrategyController],
  providers: [BrandStrategyService, DatabaseService],
  exports: [BrandStrategyService],
})
export class BrandStrategyModule {}
