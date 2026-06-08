import { IsOptional, IsString } from 'class-validator';

export class UpdateInformasiDto {
  @IsOptional()
  @IsString()
  judul?: string;

  @IsOptional()
  @IsString()
  isi?: string;
}
