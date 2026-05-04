import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePengaduanDto {
  @IsString()
  @IsNotEmpty()
  user_id!: string;

  @IsString()
  @IsNotEmpty()
  judul!: string;

  @IsString()
  @IsNotEmpty()
  deskripsi!: string;
}
