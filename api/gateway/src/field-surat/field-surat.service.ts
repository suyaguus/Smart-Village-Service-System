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

  //   method findAll
  async findAll(): Promise<ServiceResponse> {
    const response = await field_surat_api.get<ServiceResponse>('/');
    return response.data;
  }

  //   method find by jenis-surat
  async findByJenisSurat(jenis_surat_id: number): Promise<ServiceResponse> {
    const response = await field_surat_api.get<ServiceResponse>(
      `/jenis-surat/${jenis_surat_id}`,
    );
    return response.data;
  }
}
