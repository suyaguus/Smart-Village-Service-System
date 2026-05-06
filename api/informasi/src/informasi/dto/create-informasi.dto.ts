import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInformasiDto {
  @IsString()
  @IsNotEmpty()
  admin_id!: string;

  @IsString()
  @IsNotEmpty()
  judul!: string;

  @IsString()
  @IsNotEmpty()
  isi!: string;

  @IsString()
  @IsOptional()
  foto?: string;
}
