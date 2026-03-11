import { Module } from '@nestjs/common';
import { HcpModule } from './hcp/hcp.module';
import { NbaModule } from './nba/nba.module';
import { BarrierModule } from './barrier/barrier.module';
import { BrandStrategyModule } from './brand-strategy/brand-strategy.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    HcpModule,
    NbaModule,
    BarrierModule,
    BrandStrategyModule,
    FeedbackModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
