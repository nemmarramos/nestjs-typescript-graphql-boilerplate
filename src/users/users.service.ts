import { User } from './models/users.model';
import { UsersArgs } from './dto/users.args';
import { Injectable } from '@nestjs/common';
import { NewUserInput } from './dto/new-user.input';

@Injectable()
export class UsersService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  async create(data: NewUserInput): Promise<User> {
    return {} as any;
  }

  async findOneById(id: string): Promise<User> {
    return {} as any;
  }

  async findAll(usersArgs: UsersArgs): Promise<User[]> {
    return [] as User[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
