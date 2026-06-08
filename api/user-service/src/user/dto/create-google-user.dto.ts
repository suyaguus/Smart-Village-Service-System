import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateGoogleUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;
}
