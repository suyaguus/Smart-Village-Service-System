import { PartialType } from '@nestjs/mapped-types';
import { CreateFieldSuratDto } from './create-field-surat.dto';

export class UpdateFieldSuratDto extends PartialType(CreateFieldSuratDto) {}
