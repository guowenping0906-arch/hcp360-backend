import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto, AnalyzeFeedbackDto } from './dto/feedback.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  /**
   * 获取 HCP 的拜访反馈列表
   * GET /api/feedback/hcp/:hcpId
   */
  @Get('hcp/:hcpId')
  async getHcpFeedbacks(@Param('hcpId') hcpId: string) {
    return this.feedbackService.getHcpFeedbacks(hcpId);
  }

  /**
   * 创建拜访反馈
   * POST /api/feedback
   */
  @Post()
  async create(@Body() dto: CreateFeedbackDto) {
    return this.feedbackService.create(dto);
  }

  /**
   * 获取反馈详情
   * GET /api/feedback/:id
   */
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.feedbackService.getById(id);
  }

  /**
   * AI 分析反馈（识别障碍点）
   * POST /api/feedback/analyze
   */
  @Post('analyze')
  async analyze(@Body() dto: AnalyzeFeedbackDto) {
    return this.feedbackService.analyze(dto);
  }

  /**
   * 更新反馈
   * PUT /api/feedback/:id
   */
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.feedbackService.update(id, dto);
  }

  /**
   * 获取关联的 NBA
   * GET /api/feedback/:id/nba
   */
  @Get(':id/nba')
  async getRelatedNba(@Param('id') id: string) {
    return this.feedbackService.getRelatedNba(id);
  }

  /**
   * 语音转文字
   * POST /api/feedback/transcribe
   */
  @Post('transcribe')
  async transcribe(@Body() dto: { audioUrl: string; hcpId?: string }) {
    return this.feedbackService.transcribe(dto);
  }
}
