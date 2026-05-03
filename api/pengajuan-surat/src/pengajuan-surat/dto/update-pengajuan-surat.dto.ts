import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { StatusPengajuan } from '../../generated/prisma/client';

// DTO untuk update status pengajuan surat
export class UpdateStatusDto {
  @IsEnum(StatusPengajuan)
  @IsNotEmpty()
  status!: StatusPengajuan;

  @IsString()
  @IsOptional()
  catatan_admin?: string;

  @IsString()
  @IsOptional()
  keterangan?: string;
}
