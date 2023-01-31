import { UsersArgs } from './dto/users.args';
import { Inject, Injectable } from '@nestjs/common';
import { NewUserInput } from './dto/new-user.input';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {}

  async create(data: NewUserInput): Promise<User> {
    const user = await this.usersRepository.insert(data);

    return {
      id: user.generatedMaps[0].id,
      ...data,
    } as unknown as User;
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    return user as any;
  }

  async findAll(usersArgs: UsersArgs): Promise<User[]> {
    const users = await this.usersRepository.find({
      skip: usersArgs.offset,
      take: usersArgs.limit,
    });
    return users;
  }

  async remove(id: string): Promise<boolean> {
    await this.usersRepository.delete(id);
    return true;
  }
}
