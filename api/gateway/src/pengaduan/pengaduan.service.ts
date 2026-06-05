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

  //   method findOne
  async findOne(id: number): Promise<ServiceResponse> {
    const response = await pengaduan_api.get<ServiceResponse>(`/${id}`);
    return response.data;
  }

  //   method update status
  async updateStatus(id: number, body: unknown): Promise<ServiceResponse> {
    const response = await pengaduan_api.patch<ServiceResponse>(
      `/${id}/status`,
      body,
    );
    return response.data;
  }

  //   method create respon feedback
  async createRespon(id: number, body: unknown): Promise<ServiceResponse> {
    const response = await pengaduan_api.post<ServiceResponse>(
      `/${id}/respon`,
      body,
    );
    return response.data;
  }

  //   method remove
  async remove(id: number): Promise<ServiceResponse> {
    const response = await pengaduan_api.delete<ServiceResponse>(`/${id}`);
    return response.data;
  }
}
