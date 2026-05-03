import { PartialType } from '@nestjs/mapped-types';
import { CreatePengajuanSuratDto } from './create-pengajuan-surat.dto';

export class UpdatePengajuanSuratDto extends PartialType(CreatePengajuanSuratDto) {}
