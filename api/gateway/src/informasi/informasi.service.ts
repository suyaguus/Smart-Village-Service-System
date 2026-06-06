import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';
import { HttpException } from '@nestjs/common';
import { user_api } from 'src/common/axios/user.axios';
import { informasi_api } from 'src/common/axios/informasi.axios';
import { ServiceResponse } from 'src/common/interfaces/service-response.interface';
// import FormData using require-style to match declaration (export = FormData)
// eslint-disable-next-line @typescript-eslint/no-require-imports
import FormData = require('form-data');

@Injectable()
export class InformasiService {
  // method create
  async create(
    body:
      | {
          admin_id?: string | number;
          [key: string]: unknown;
        }
      | undefined,
  ): Promise<ServiceResponse> {
    if (!body)
      throw new BadRequestException('Request body tidak boleh kosong!');
    const maybe = body.admin_id;
    if (maybe === undefined || maybe === null || maybe === '')
      throw new BadRequestException('admin_id is required');
    const userId = String(maybe);

    try {
      await user_api.get(`/${userId}`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        throw new BadRequestException('ID User Tidak Ditemukan!');
      }

      if (err instanceof HttpException) {
        const status = err.getStatus();
        if (status === 404)
          throw new BadRequestException('ID User Tidak Ditemukan!');
        throw err;
      }

      throw err;
    }

    const response = await informasi_api.post<ServiceResponse>(
      '/',
      body as any,
    );
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

  //   method remove foto
  async removeFoto(id: number, foto_id: number): Promise<ServiceResponse> {
    const response = await informasi_api.delete<ServiceResponse>(
      `/${id}/foto/${foto_id}`,
    );
    return response.data;
  }
}
