import { IsString, IsOptional, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStrategyDto {
  @IsString()
  brand_name: string;

  @IsString()
  @IsOptional()
  brand_name_en?: string;

  @IsString()
  @IsOptional()
  strategy_name?: string;

  @IsString()
  @IsOptional()
  strategy_name_en?: string;

  @IsString()
  @IsOptional()
  start_date?: string;

  @IsString()
  @IsOptional()
  end_date?: string;

  @IsString()
  @IsOptional()
  target_drug?: string;

  @IsObject()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Object)
  kpi_targets?: any;
}

export class UpdateStrategyDto {
  @IsString()
  @IsOptional()
  brand_name?: string;

  @IsString()
  @IsOptional()
  strategy_name?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
