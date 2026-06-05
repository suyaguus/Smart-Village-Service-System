import { Injectable } from '@nestjs/common';
import { user_api } from 'src/common/axios/user.axios';

@Injectable()
export class UserService {
  // buat fungsi create
  async create(body: unknown) {
    const response = await user_api.post('/', body);
    return response.data;
  }

  // buat fungsi findAll
  async findAll() {
    const response = await user_api.get('/');
    return response.data;
  }

  // buat fungsi findOne
  async findOne(id: number) {
    const response = await user_api.get(`/${id}`);
    return response.data;
  }

  //   buat fungsi update
  async update(id: number, body: unknown) {
    const response = await user_api.patch(`/${id}`, body);
    return response.data;
  }
}
