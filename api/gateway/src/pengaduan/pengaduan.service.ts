import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';
import { HttpException } from '@nestjs/common';
import { user_api } from 'src/common/axios/user.axios';
import { pengaduan_api } from 'src/common/axios/pengaduan.axios';
import { ServiceResponse } from 'src/common/interfaces/service-response.interface';
import { CreatePengaduanDto } from './dto/create-pengaduan.dto';

@Injectable()
export class PengaduanService {
  // method create
  async create(body: CreatePengaduanDto): Promise<ServiceResponse> {
    const maybe = body.user_id;
    if (maybe === undefined || maybe === null || maybe === '')
      throw new BadRequestException('user_id is required');
    const userId = String(maybe);

    try {
      await user_api.get(`/${userId}`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          throw new BadRequestException('ID User Tidak Ditemukan!');
        }
      }

      if (err instanceof HttpException) {
        const status = err.getStatus();
        if (status === 404)
          throw new BadRequestException('ID User Tidak Ditemukan!');
        throw err;
      }

      throw err;
    }

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
