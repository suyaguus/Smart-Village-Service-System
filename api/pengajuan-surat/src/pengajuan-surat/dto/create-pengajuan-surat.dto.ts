import { IsNotEmpty, IsUUID } from 'class-validator';

// DTO untuk membuat pengajuan surat
export class CreatePengajuanSuratDto {
  @IsUUID()
  @IsNotEmpty()
  user_id!: string;

  @IsUUID()
  @IsNotEmpty()
  jenis_surat_id!: string;
}
