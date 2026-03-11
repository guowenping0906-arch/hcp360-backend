import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { NbaService } from './nba.service';
import { CreateNbaDto, UpdateNbaDto } from './dto/nba.dto';

@Controller('nba')
export class NbaController {
  constructor(private readonly nbaService: NbaService) {}

  /**
   * 获取 HCP 的 NBA 推荐列表
   * GET /api/nba/hcp/:hcpId
   */
  @Get('hcp/:hcpId')
  async getHcpNbas(@Param('hcpId') hcpId: string) {
    return this.nbaService.getHcpNbas(hcpId);
  }

  /**
   * 创建 NBA 推荐
   * POST /api/nba
   */
  @Post()
  async create(@Body() dto: CreateNbaDto) {
    return this.nbaService.create(dto);
  }

  /**
   * 获取 NBA 详情
   * GET /api/nba/:id
   */
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.nbaService.getById(id);
  }

  /**
   * 更新 NBA 推荐
   * PUT /api/nba/:id
   */
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateNbaDto) {
    return this.nbaService.update(id, dto);
  }

  /**
   * 删除 NBA 推荐
   * DELETE /api/nba/:id
   */
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.nbaService.delete(id);
  }

  /**
   * 执行 NBA 行动
   * POST /api/nba/:id/execute
   */
  @Post(':id/execute')
  async execute(@Param('id') id: string, @Body() dto: { actionType: string; notes?: string }) {
    return this.nbaService.execute(id, dto);
  }

  /**
   * 忽略/消除 NBA 推荐
   * POST /api/nba/:id/dismiss
   */
  @Post(':id/dismiss')
  async dismiss(@Param('id') id: string, @Body() dto: { reason?: string }) {
    return this.nbaService.dismiss(id, dto);
  }

  /**
   * 批量获取多个 HCP 的 NBA
   * POST /api/nba/batch
   */
  @Post('batch')
  async getBatch(@Body() dto: { hcpIds: string[] }) {
    return this.nbaService.getBatch(dto.hcpIds);
  }

  /**
   * 获取待执行的 NBA 列表
   * GET /api/nba/pending
   */
  @Get('pending')
  async getPending(
    @Query('limit') limit?: number,
    @Query('priority') priority?: string
  ) {
    return this.nbaService.getPending({ limit, priority });
  }
}
