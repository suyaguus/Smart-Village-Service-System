import { IsEnum, IsNotEmpty } from 'class-validator';
import { StatusPengaduan } from '../../generated/prisma/client';

export class UpdateStatusDto {
  @IsEnum(StatusPengaduan)
  @IsNotEmpty()
  status!: StatusPengaduan;
}
