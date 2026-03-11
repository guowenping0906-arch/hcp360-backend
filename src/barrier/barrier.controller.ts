import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { BarrierService } from './barrier.service';
import { CreateBarrierDto, UpdateBarrierDto } from './dto/barrier.dto';

@Controller('barrier')
export class BarrierController {
  constructor(private readonly barrierService: BarrierService) {}

  /**
   * 获取障碍点字典列表
   * GET /api/barrier/dictionary
   */
  @Get('dictionary')
  async getDictionary(
    @Query('segmentId') segmentId?: string,
    @Query('category') category?: string
  ) {
    return this.barrierService.getDictionary({ segmentId, category });
  }

  /**
   * 创建障碍点字典
   * POST /api/barrier/dictionary
   */
  @Post('dictionary')
  async createDictionary(@Body() dto: CreateBarrierDto) {
    return this.barrierService.createDictionary(dto);
  }

  /**
   * 获取 HCP 障碍点列表
   * GET /api/barrier/hcp/:hcpId
   */
  @Get('hcp/:hcpId')
  async getHcpBarriers(@Param('hcpId') hcpId: string) {
    return this.barrierService.getHcpBarriers(hcpId);
  }

  /**
   * 添加 HCP 障碍点
   * POST /api/barrier/hcp/:hcpId
   */
  @Post('hcp/:hcpId')
  async addHcpBarrier(
    @Param('hcpId') hcpId: string,
    @Body() dto: { barrierName: string; source: string; confidence: number }
  ) {
    return this.barrierService.addHcpBarrier(hcpId, dto);
  }

  /**
   * 更新 HCP 障碍点状态
   * PUT /api/barrier/hcp/:hcpId/:barrierId
   */
  @Put('hcp/:hcpId/:barrierId')
  async updateHcpBarrier(
    @Param('hcpId') hcpId: string,
    @Param('barrierId') barrierId: string,
    @Body() dto: UpdateBarrierDto
  ) {
    return this.barrierService.updateHcpBarrier(hcpId, barrierId, dto);
  }

  /**
   * 删除 HCP 障碍点
   * DELETE /api/barrier/hcp/:hcpId/:barrierId
   */
  @Delete('hcp/:hcpId/:barrierId')
  async deleteHcpBarrier(
    @Param('hcpId') hcpId: string,
    @Param('barrierId') barrierId: string
  ) {
    return this.barrierService.deleteHcpBarrier(hcpId, barrierId);
  }

  /**
   * 批量添加障碍点（从 AI 分析）
   * POST /api/barrier/hcp/:hcpId/batch
   */
  @Post('hcp/:hcpId/batch')
  async batchAddBarriers(
    @Param('hcpId') hcpId: string,
    @Body() dto: { barriers: Array<{ barrierName: string; confidence: number }> }
  ) {
    return this.barrierService.batchAddBarriers(hcpId, dto.barriers);
  }
}
