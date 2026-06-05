import { Injectable } from '@nestjs/common';
import { user_api } from 'src/common/axios/user.axios';

@Injectable()
export class UserService {
  async create(body: unknown) {
    const response = await user_api.post('/', body);
    return response.data;
  }
}
