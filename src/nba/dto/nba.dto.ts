import { IsString, IsOptional, IsNumber, IsArray, IsBoolean, ValidateNested } from 'class-validator';

export class CreateNbaDto {
  @IsString()
  hcpId: string;

  @IsArray()
  @IsString({ each: true })
  barrierIds: string[];

  @IsString()
  actionType: 'visit' | 'meeting' | 'content_delivery' | 'call';

  @IsString()
  actionTitle: string;

  @IsString()
  actionReason: string;

  @IsArray()
  @IsString({ each: true })
  talkingPoints: string[];

  @IsOptional()
  @IsNumber()
  priority?: number;

  @IsOptional()
  @IsBoolean()
  isAutoAdjusted?: boolean;

  @IsOptional()
  @IsString()
  suggestedTiming?: string;

  @IsOptional()
  @IsString()
  contentUrl?: string;
}

export class UpdateNbaDto {
  @IsOptional()
  @IsString()
  actionTitle?: string;

  @IsOptional()
  @IsString()
  actionReason?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  talkingPoints?: string[];

  @IsOptional()
  @IsNumber()
  priority?: number;

  @IsOptional()
  @IsString()
  status?: 'pending' | 'executed' | 'dismissed' | 'expired';
}

export class NbaExecuteDto {
  @IsString()
  actionType: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  executedAt?: string;
}
