import { PartialType } from '@nestjs/mapped-types';
import { CreateInformasiDto } from './create-informasi.dto';

export class UpdateInformasiDto extends PartialType(CreateInformasiDto) {}
