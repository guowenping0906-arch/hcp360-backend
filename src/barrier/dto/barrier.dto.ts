import { IsString, IsOptional, IsNumber, IsBoolean, IsArray, ValidateNested } from 'class-validator';

export class CreateBarrierDto {
  @IsString()
  barrierName: string;

  @IsString()
  barrierCategory: string;

  @IsOptional()
  @IsString()
  segmentId?: string;

  @IsOptional()
  @IsBoolean()
  isCrossCutting?: boolean;

  @IsOptional()
  @IsString()
  cognitionLevel?: string;

  @IsOptional()
  @IsArray()
  suggestedActions?: any[];

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateBarrierDto {
  @IsOptional()
  @IsString()
  status?: 'active' | 'resolved' | 'dismissed';

  @IsOptional()
  @IsString()
  resolutionNote?: string;
}

export class BarrierAnalysisDto {
  @IsString()
  feedbackText: string;

  @IsOptional()
  @IsString()
  voiceTranscript?: string;
}
