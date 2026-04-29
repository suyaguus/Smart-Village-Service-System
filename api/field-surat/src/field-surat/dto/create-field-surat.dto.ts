import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { FieldType } from '../../generated/prisma/client';

export class CreateFieldSuratDto {
  @IsInt()
  @Min(1)
  jenis_surat_id!: number;

  @IsString()
  @IsNotEmpty()
  field_name!: string;

  @IsString()
  @IsNotEmpty()
  field_label!: string;

  @IsEnum(FieldType)
  field_type!: FieldType;

  @IsBoolean()
  @IsOptional()
  is_required?: boolean;

  @IsInt()
  @Min(1)
  field_order!: number;

  @IsInt()
  @IsOptional()
  max_file_size?: number;

  @IsString()
  @IsOptional()
  accepted_format?: string;
}
