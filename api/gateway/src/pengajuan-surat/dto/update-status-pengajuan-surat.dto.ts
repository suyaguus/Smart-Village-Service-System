import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum PengajuanStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export class UpdateStatusPengajuanSuratDto {
  @IsEnum(PengajuanStatus)
  status!: PengajuanStatus;

  @IsOptional()
  @IsString()
  reason?: string;
}
