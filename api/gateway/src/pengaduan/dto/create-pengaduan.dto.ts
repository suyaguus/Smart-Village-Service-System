import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePengaduanDto {
  @IsNotEmpty()
  @IsString()
  user_id!: string;

  @IsNotEmpty()
  @IsString()
  judul!: string;

  @IsNotEmpty()
  @IsString()
  deskripsi!: string;
}
