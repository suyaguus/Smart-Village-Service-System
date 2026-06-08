import { IsNotEmpty, IsString } from 'class-validator';

export class CreateResponPengaduanDto {
  @IsNotEmpty()
  @IsString()
  admin_id!: string;

  @IsNotEmpty()
  @IsString()
  text!: string;
}
