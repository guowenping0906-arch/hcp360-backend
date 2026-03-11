import { Module } from '@nestjs/common';
import { HcpController } from './hcp.controller';
import { HcpService } from './hcp.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [HcpController],
  providers: [HcpService],
  exports: [HcpService]
})
export class HcpModule {}
