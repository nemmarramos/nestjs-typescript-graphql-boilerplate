import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { NewUserInput } from './dto/new-user.input';
import { UsersArgs } from './dto/users.args';
import { UsersService } from './users.service';
import { User } from './models/users.model';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    const recipe = await this.usersService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  @Query(() => [User])
  users(@Args() usersArgs: UsersArgs): Promise<User[]> {
    return this.usersService.findAll(usersArgs);
  }

  @Mutation(() => User)
  async addUser(@Args('newUserData') newUserData: NewUserInput): Promise<User> {
    const user = await this.usersService.create(newUserData);
    return user;
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id') id: string) {
    return this.usersService.remove(id);
  }
}
