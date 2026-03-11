import { IsString, IsOptional, IsArray, IsNumber, ValidateNested } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  hcpId: string;

  @IsOptional()
  @IsString()
  nbaId?: string;

  @IsString()
  feedbackText: string;

  @IsOptional()
  @IsString()
  feedbackType: 'voice' | 'text';

  @IsOptional()
  @IsString()
  voiceUrl?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  detectedBarriers?: Array<{
    barrierName: string;
    confidence: number;
  }>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  newBarriers?: string[];

  @IsOptional()
  @IsString()
  visitDate?: string;

  @IsOptional()
  @IsString()
  nextStep?: string;
}

export class AnalyzeFeedbackDto {
  @IsString()
  feedbackText: string;

  @IsOptional()
  @IsString()
  voiceTranscript?: string;

  @IsOptional()
  @IsString()
  hcpId?: string;

  @IsOptional()
  @IsString()
  context?: string;
}

export class TranscribeDto {
  @IsString()
  audioUrl: string;

  @IsOptional()
  @IsString()
  language?: string;
}
