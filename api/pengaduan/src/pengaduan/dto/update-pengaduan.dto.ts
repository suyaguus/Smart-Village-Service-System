import { PartialType } from '@nestjs/mapped-types';
import { CreatePengaduanDto } from './create-pengaduan.dto';

export class UpdatePengaduanDto extends PartialType(CreatePengaduanDto) {}
