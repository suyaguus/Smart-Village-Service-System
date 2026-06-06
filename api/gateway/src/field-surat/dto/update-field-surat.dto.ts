import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { FieldType } from './create-field-surat.dto';

export class UpdateFieldSuratDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  jenis_surat_id?: number;

  @IsOptional()
  @IsString()
  field_name?: string;

  @IsOptional()
  @IsString()
  field_label?: string;

  @IsOptional()
  @IsEnum(FieldType)
  field_type?: FieldType;

  @IsOptional()
  @IsBoolean()
  is_required?: boolean;

  @IsOptional()
  @IsInt()
  @Min(1)
  field_order?: number;

  @IsOptional()
  @IsNumber()
  max_file_size?: number;

  @IsOptional()
  @IsString()
  accepted_format?: string;
}
