import { Module } from '@nestjs/common';
import { BarrierController } from './barrier.controller';
import { BarrierService } from './barrier.service';

@Module({
  controllers: [BarrierController],
  providers: [BarrierService],
  exports: [BarrierService]
})
export class BarrierModule {}
