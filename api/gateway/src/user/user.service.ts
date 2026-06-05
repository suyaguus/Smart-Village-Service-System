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
}
