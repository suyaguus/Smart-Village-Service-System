import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJenisSuratDto {
  @IsNotEmpty()
  @IsString()
  nama_surat!: string;

  @IsNotEmpty()
  @IsString()
  kode_surat!: string;

  @IsOptional()
  @IsString()
  deskripsi?: string;
}
