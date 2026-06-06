import { Injectable } from '@nestjs/common';
import { user_api } from 'src/common/axios/user.axios';
import { ServiceResponse } from 'src/common/interfaces/service-response.interface';

@Injectable()
export class UserService {
  // buat fungsi create
  async create(body: unknown): Promise<ServiceResponse> {
    const response = await user_api.post<ServiceResponse>('/', body);
    return response.data;
  }

  // buat fungsi findAll
  async findAll(): Promise<ServiceResponse> {
    const response = await user_api.get<ServiceResponse>('/');
    return response.data;
  }

  // buat fungsi findOne
  async findOne(id: number): Promise<ServiceResponse> {
    const response = await user_api.get<ServiceResponse>(`/${id}`);
    return response.data;
  }

  // buat fungsi update
  async update(id: number, body: unknown): Promise<ServiceResponse> {
    const response = await user_api.patch<ServiceResponse>(`/${id}`, body);
    return response.data;
  }

  // buat fungsi remove
  async remove(id: number): Promise<ServiceResponse> {
    const response = await user_api.delete<ServiceResponse>(`/${id}`);
    return response.data;
  }
}
