import { IsNotEmpty, IsString } from 'class-validator';

export class CreateResponDto {
  @IsString()
  @IsNotEmpty()
  admin_id!: string;

  @IsString()
  @IsNotEmpty()
  text!: string;
}
