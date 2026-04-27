import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJenisSuratDto {
  @IsString()
  @IsNotEmpty()
  nama_surat!: string;

  @IsString()
  @IsNotEmpty()
  kode_surat!: string;

  @IsString()
  @IsOptional()
  deskripsi?: string;
}
