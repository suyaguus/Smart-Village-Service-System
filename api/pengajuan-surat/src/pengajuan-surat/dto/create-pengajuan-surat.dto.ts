import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

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
}
