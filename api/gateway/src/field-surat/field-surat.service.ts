import { Injectable } from '@nestjs/common';
import { field_surat_api } from 'src/common/axios/field-surat.axios';
import { ServiceResponse } from 'src/common/interfaces/service-response.interface';

@Injectable()
export class FieldSuratService {
  // method create
  async create(body: unknown): Promise<ServiceResponse> {
    const response = await field_surat_api.post<ServiceResponse>('/', body);
    return response.data;
  }
}
