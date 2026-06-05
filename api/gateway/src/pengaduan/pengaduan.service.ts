import { Injectable } from '@nestjs/common';
import { pengaduan_api } from 'src/common/axios/pengaduan.axios';
import { ServiceResponse } from 'src/common/interfaces/service-response.interface';

@Injectable()
export class PengaduanService {
  // method create
  async create(body: unknown): Promise<ServiceResponse> {
    const response = await pengaduan_api.post<ServiceResponse>('/', body);
    return response.data;
  }

  //   method findAll
  async findAll(): Promise<ServiceResponse> {
    const response = await pengaduan_api.get<ServiceResponse>('/');
    return response.data;
  }

  //   method find by user
  async findByUser(user_id: string): Promise<ServiceResponse> {
    const response = await pengaduan_api.get<ServiceResponse>(
      `/user/${user_id}`,
    );
    return response.data;
  }
}
