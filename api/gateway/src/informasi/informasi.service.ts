import { Injectable } from '@nestjs/common';
import { informasi_api } from 'src/common/axios/informasi.axios';
import { ServiceResponse } from 'src/common/interfaces/service-response.interface';

@Injectable()
export class InformasiService {
  // method create
  async create(body: unknown): Promise<ServiceResponse> {
    const response = await informasi_api.post<ServiceResponse>('/', body);
    return response.data;
  }

  //   method findAll
  async findAll(): Promise<ServiceResponse> {
    const response = await informasi_api.get<ServiceResponse>('/');
    return response.data;
  }

  //   method findOne
  async findOne(id: number): Promise<ServiceResponse> {
    const response = await informasi_api.get<ServiceResponse>(`/${id}`);
    return response.data;
  }
}
