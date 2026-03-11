import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsArray,
  IsOptional,
  IsNumber,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Create Brand Strategy DTO
 * 创建品牌策略数据传输对象
 */
export class CreateStrategyDto {
  @IsString()
  @IsNotEmpty()
  brandName: string; // 品牌名称

  @IsString()
  @IsNotEmpty()
  strategyName: string; // 策略名称

  @IsDateString()
  @IsNotEmpty()
  startDate: string; // 开始日期

  @IsDateString()
  @IsNotEmpty()
  endDate: string; // 结束日期

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DrugItemDto)
  targetDrugs: DrugItemDto[]; // 目标药品

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DrugItemDto)
  indications: DrugItemDto[]; // 适应症

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DrugItemDto)
  competitors: DrugItemDto[]; // 竞争对手

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KPIConfigDto)
  kpis: KPIConfigDto[]; // KPI 配置

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SegmentConfigDto)
  segments: SegmentConfigDto[]; // HCP 分群配置

  // HCP 全局配置
  @IsString()
  @IsOptional()
  hcpDescription?: string; // HCP 描述

  @IsArray()
  @IsOptional()
  hcpTags?: string[]; // HCP 标签

  // 对应内容
  @IsString()
  @IsOptional()
  coreValueProposition?: string; // 核心价值主张

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScenarioConfigDto)
  scenarios?: ScenarioConfigDto[]; // 细分场景
}

/**
 * Drug Item DTO
 * 药品/适应症/竞争对手项
 */
export class DrugItemDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

/**
 * KPI Config DTO
 * KPI 配置项
 */
export class KPIConfigDto {
  @IsString()
  @IsNotEmpty()
  dimension: string; // 维度

  @IsString()
  @IsNotEmpty()
  statistic: string; // 统计方式

  @IsNumber()
  @IsNotEmpty()
  targetValue: number; // 目标值

  @IsString()
  @IsOptional()
  hcpClass?: string; // 适用 HCP 分类
}

/**
 * Scenario Config DTO
 * 细分场景配置项
 */
export class ScenarioConfigDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  scenarioName?: string; // 场景名称

  @IsString()
  @IsOptional()
  strategyContent?: string; // 策略内容

  @IsArray()
  @IsOptional()
  contentTags?: string[]; // 内容标签
}

/**
 * HCP Segment Config DTO
 * HCP 分群配置项
 */
export class SegmentConfigDto {
  @IsString()
  @IsNotEmpty()
  segmentName: string; // 分群名称

  @IsString()
  @IsOptional()
  cognitionLevel?: string; // 观念阶梯层级

  @IsString()
  @IsOptional()
  hcpDescription?: string; // HCP 描述

  @IsArray()
  @IsOptional()
  hcpTags?: string[]; // HCP 标签

  @IsArray()
  @IsOptional()
  requiredActivities?: string[]; // 必须的活动形式

  @IsOptional()
  activityFrequency?: {
    visit?: number;
    meeting?: number;
    content?: number;
  }; // 活动频率

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KeyMessageDto)
  keyMessages?: KeyMessageDto[]; // 关键信息
}

/**
 * Key Message DTO
 * 关键信息配置项
 */
export class KeyMessageDto {
  @IsString()
  @IsNotEmpty()
  messageText: string; // 关键信息内容

  @IsString()
  @IsOptional()
  messageType?: string; // 消息类型

  @IsNumber()
  @IsOptional()
  targetReachRate?: number; // 目标覆盖率

  @IsNumber()
  @IsOptional()
  targetUpgradeRate?: number; // 目标观念升级率

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContentDto)
  contents?: ContentDto[]; // 内容/话术
}

/**
 * Content DTO
 * 内容/话术配置项
 */
export class ContentDto {
  @IsString()
  @IsNotEmpty()
  contentType: string; // 内容类型

  @IsString()
  @IsOptional()
  contentTitle?: string; // 内容标题

  @IsString()
  @IsOptional()
  contentText?: string; // 内容正文

  @IsArray()
  @IsOptional()
  contentTags?: string[]; // 内容标签

  @IsString()
  @IsOptional()
  sourceUrl?: string; // 内容源链接
}

/**
 * Update Brand Strategy DTO
 * 更新品牌策略数据传输对象
 */
export class UpdateStrategyDto {
  @IsString()
  @IsOptional()
  brandName?: string;

  @IsString()
  @IsOptional()
  strategyName?: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsArray()
  @IsOptional()
  targetDrugs?: DrugItemDto[];

  @IsArray()
  @IsOptional()
  indications?: DrugItemDto[];

  @IsArray()
  @IsOptional()
  competitors?: DrugItemDto[];

  @IsArray()
  @IsOptional()
  kpis?: KPIConfigDto[];

  @IsArray()
  @IsOptional()
  segments?: SegmentConfigDto[];

  // HCP 全局配置
  @IsString()
  @IsOptional()
  hcpDescription?: string;

  @IsArray()
  @IsOptional()
  hcpTags?: string[];

  // 对应内容
  @IsString()
  @IsOptional()
  coreValueProposition?: string;

  @IsArray()
  @IsOptional()
  scenarios?: ScenarioConfigDto[];
}
