import { Injectable } from '@nestjs/common';
import { jenis_surat_api } from 'src/common/axios/jenis-surat.axios';
import { ServiceResponse } from 'src/common/interfaces/service-response.interface';

@Injectable()
export class JenisSuratService {
  // method create
  async create(body: unknown): Promise<ServiceResponse> {
    const response = await jenis_surat_api.post<ServiceResponse>('/', body);
    return response.data;
  }

  //   method findAll
  async findAll(): Promise<ServiceResponse> {
    const response = await jenis_surat_api.get<ServiceResponse>('/');
    return response.data;
  }

  //   method findOne
  async findOne(id: number): Promise<ServiceResponse> {
    const response = await jenis_surat_api.get<ServiceResponse>(`/${id}`);
    return response.data;
  }

  //   method update
  async update(id: number, body: unknown): Promise<ServiceResponse> {
    const response = await jenis_surat_api.patch<ServiceResponse>(
      `/${id}`,
      body,
    );
    return response.data;
  }

  //   method remove
  async remove(id: number): Promise<ServiceResponse> {
    const response = await jenis_surat_api.delete<ServiceResponse>(`/${id}`);
    return response.data;
  }
}
