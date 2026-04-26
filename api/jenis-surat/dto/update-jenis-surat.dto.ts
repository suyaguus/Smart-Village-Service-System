import { PartialType } from '@nestjs/mapped-types';
import { CreateJenisSuratDto } from './create-jenis-surat.dto';

export class UpdateJenisSuratDto extends PartialType(CreateJenisSuratDto) {}
