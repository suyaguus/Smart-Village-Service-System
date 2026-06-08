import { IsOptional, IsString } from 'class-validator';

export class UpdateJenisSuratDto {
  @IsOptional()
  @IsString()
  nama_surat?: string;

  @IsOptional()
  @IsString()
  kode_surat?: string;

  @IsOptional()
  @IsString()
  deskripsi?: string;
}
