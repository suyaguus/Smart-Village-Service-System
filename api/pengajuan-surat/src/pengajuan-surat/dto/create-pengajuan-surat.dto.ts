import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// DTO untuk membuat pengajuan dokumen
export class CreatePengajuanDokumenDto {
  @IsUUID()
  @IsNotEmpty()
  field_id!: string;

  @IsString()
  @IsNotEmpty()
  file_url!: string;
}

// DTO untuk membuat pengajuan detail
export class CreatePengajuanDetailDto {
  @IsUUID()
  @IsNotEmpty()
  field_id!: string;

  @IsString()
  @IsNotEmpty()
  value!: string;
}

// DTO untuk membuat pengajuan surat
export class CreatePengajuanSuratDto {
  @IsUUID()
  @IsNotEmpty()
  user_id!: string;

  @IsUUID()
  @IsNotEmpty()
  jenis_surat_id!: string;

  //   array untuk menanggung banyak pengajuan detail
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePengajuanDetailDto)
  detail!: CreatePengajuanDetailDto[];

  //   array untuk menanggung banyak pengajuan dokumen, sifatnya optional karena tidak semua jenis surat membutuhkan dokumen
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePengajuanDokumenDto)
  dokumen?: CreatePengajuanDokumenDto[];
}
