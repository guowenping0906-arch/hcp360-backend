import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { HcpService } from './hcp.service';
import { CreateHcpDto, UpdateHcpDto } from './dto/hcp.dto';

@Controller('hcp')
export class HcpController {
  constructor(private readonly hcpService: HcpService) {}

  /**
   * 获取 HCP 列表
   * GET /api/hcp
   */
  @Get()
  async getList(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('segment') segment?: string,
    @Query('department') department?: string,
    @Query('name') name?: string
  ) {
    return this.hcpService.getList({
      page: Number(page) || 1,
      pageSize: Number(pageSize) || 20,
      segment,
      department,
      name
    });
  }

  /**
   * 获取 HCP 详情（含画像/标签/NBA）
   * GET /api/hcp/:id/profile
   */
  @Get(':id/profile')
  async getProfile(@Param('id') id: string) {
    return this.hcpService.getProfile(id);
  }

  /**
   * 创建 HCP
   * POST /api/hcp
   */
  @Post()
  async create(@Body() dto: CreateHcpDto) {
    return this.hcpService.create(dto);
  }

  /**
   * 更新 HCP 信息
   * PUT /api/hcp/:id
   */
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateHcpDto) {
    return this.hcpService.update(id, dto);
  }

  /**
   * 删除 HCP
   * DELETE /api/hcp/:id
   */
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.hcpService.delete(id);
  }

  /**
   * 批量导入 HCP
   * POST /api/hcp/batch
   */
  @Post('batch')
  async batchImport(@Body() dto: { hcps: CreateHcpDto[] }) {
    return this.hcpService.batchImport(dto.hcps);
  }

  /**
   * 更新 HCP 标签
   * PUT /api/hcp/:id/tags
   */
  @Put(':id/tags')
  async updateTags(
    @Param('id') id: string,
    @Body() dto: { tags: Array<{ id?: string; name: string; color: string }> }
  ) {
    return this.hcpService.updateTags(id, dto.tags);
  }

  /**
   * 更新 HCP 观念阶梯
   * PUT /api/hcp/:id/segment
   */
  @Put(':id/segment')
  async updateSegment(
    @Param('id') id: string,
    @Body() dto: { segmentId: string; reason?: string }
  ) {
    return this.hcpService.updateSegment(id, dto);
  }

  /**
   * 搜索 HCP
   * GET /api/hcp/search
   */
  @Get('search')
  async search(@Query('q') query: string, @Query('limit') limit?: number) {
    return this.hcpService.search(query, Number(limit) || 10);
  }

  /**
   * 获取 HCP 动态（会议/文章）
   * GET /api/hcp/:id/activities
   */
  @Get(':id/activities')
  async getActivities(@Param('id') id: string) {
    return this.hcpService.getActivities(id);
  }

  /**
   * 获取 HCP 关系网络
   * GET /api/hcp/:id/network
   */
  @Get(':id/network')
  async getNetwork(@Param('id') id: string) {
    return this.hcpService.getNetwork(id);
  }

  /**
   * 获取 HCP 处方药品数据
   * GET /api/hcp/:id/prescriptions
   */
  @Get(':id/prescriptions')
  async getPrescriptions(@Param('id') id: string) {
    return this.hcpService.getPrescriptions(id);
  }
}
