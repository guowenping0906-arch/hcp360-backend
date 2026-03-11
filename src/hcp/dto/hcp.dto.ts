import { IsString, IsOptional, IsNumber, IsArray, ValidateNested } from 'class-validator';

export class CreateHcpDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  department: string;

  @IsString()
  hospital: string;

  @IsOptional()
  @IsString()
  hospitalLevel?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  segmentId?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateHcpDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  hospital?: string;

  @IsOptional()
  @IsString()
  hospitalLevel?: string;

  @IsOptional()
  @IsString()
  segmentId?: string;

  @IsOptional()
  @IsArray()
  tags?: Array<{ id?: string; name: string; color: string }>;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class HcpTagDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  name: string;

  @IsString()
  color: string;
}
