import { IsEnum, IsNotEmpty } from 'class-validator';

export enum StatusPengaduan {
  MENUNGGU = 'MENUNGGU',
  DIPROSES = 'DIPROSES',
  SELESAI = 'SELESAI',
}

export class UpdateStatusPengaduanDto {
  @IsNotEmpty()
  @IsEnum(StatusPengaduan)
  status!: StatusPengaduan;
}
