import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInformasiDto {
  @IsNotEmpty()
  @IsString()
  admin_id!: string;

  @IsNotEmpty()
  @IsString()
  judul!: string;

  @IsNotEmpty()
  @IsString()
  isi!: string;
}
