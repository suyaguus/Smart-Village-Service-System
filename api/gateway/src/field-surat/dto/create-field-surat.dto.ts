import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export enum FieldType {
  text = 'text',
  number = 'number',
  date = 'date',
  textarea = 'textarea',
  file = 'file',
}

export class CreateFieldSuratDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  jenis_surat_id!: number;

  @IsNotEmpty()
  @IsString()
  field_name!: string;

  @IsNotEmpty()
  @IsString()
  field_label!: string;

  @IsNotEmpty()
  @IsEnum(FieldType)
  field_type!: FieldType;

  @IsOptional()
  @IsBoolean()
  is_required?: boolean;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  field_order!: number;

  @IsOptional()
  @IsNumber()
  max_file_size?: number;

  @IsOptional()
  @IsString()
  accepted_format?: string;
}
