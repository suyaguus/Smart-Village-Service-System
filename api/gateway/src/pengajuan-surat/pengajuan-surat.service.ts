import { Injectable } from '@nestjs/common';
import { pengajuan_surat_api } from 'src/common/axios/pengajuan-surat.axios';
import { ServiceResponse } from 'src/common/interfaces/service-response.interface';

@Injectable()
export class PengajuanSuratService {
  // method create
  async create(body: unknown): Promise<ServiceResponse> {
    const response = await pengajuan_surat_api.post<ServiceResponse>('/', body);
    return response.data;
  }

  //   method findAll
  async findAll(): Promise<ServiceResponse> {
    const response = await pengajuan_surat_api.get<ServiceResponse>('/');
    return response.data;
  }

  //   method find by user
  async findByUser(user_id: string): Promise<ServiceResponse> {
    const response = await pengajuan_surat_api.get<ServiceResponse>(
      `/user/${user_id}`,
    );
    return response.data;
  }

  //   method findOne
  async findOne(id: string): Promise<ServiceResponse> {
    const response = await pengajuan_surat_api.get<ServiceResponse>(`/${id}`);
    return response.data;
  }
}
