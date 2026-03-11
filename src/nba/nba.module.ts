import { Module } from '@nestjs/common';
import { NbaController } from './nba.controller';
import { NbaService } from './nba.service';

@Module({
  controllers: [NbaController],
  providers: [NbaService],
  exports: [NbaService]
})
export class NbaModule {}
