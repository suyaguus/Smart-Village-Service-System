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

  //   method update
  async update(id: number, body: unknown): Promise<ServiceResponse> {
    const response = await informasi_api.patch<ServiceResponse>(`/${id}`, body);
    return response.data;
  }

  //   method remove
  async remove(id: number): Promise<ServiceResponse> {
    const response = await informasi_api.delete<ServiceResponse>(`/${id}`);
    return response.data;
  }

  //   method add foto
  async addFoto(
    id: number,
    file: Express.Multer.File,
  ): Promise<ServiceResponse> {
    const form = new FormData();
    form.append('foto', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const response = await informasi_api.post<ServiceResponse>(
      `/${id}/foto`,
      form,
      {
        headers: form.getHeaders(),
      },
    );
    return response.data;
  }
}
