import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class FieldValue {
  @IsString()
  key: string;

  @IsString()
  value: string;
}

export class CreatePengajuanSuratDto {
  @IsInt()
  @Type(() => Number)
  user_id!: number;

  @IsInt()
  @Type(() => Number)
  jenis_surat_id!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FieldValue)
  fields!: FieldValue[];

  @IsOptional()
  @IsArray()
  lampiran?: string[]; // filenames or URLs proxied through gateway
}
