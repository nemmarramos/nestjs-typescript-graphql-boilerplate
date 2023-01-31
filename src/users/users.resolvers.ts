import { UsersArgs } from './dto/users.args';
import { UsersService } from './users.service';
import { User } from './models/users.model';
import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewUserInput } from './dto/new-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  async recipe(@Args('id') id: string): Promise<User> {
    const recipe = await this.usersService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  @Query(() => [User])
  recipes(@Args() usersArgs: UsersArgs): Promise<User[]> {
    return this.usersService.findAll(usersArgs);
  }

  @Mutation(() => User)
  async addRecipe(
    @Args('newUserData') newUserData: NewUserInput,
  ): Promise<User> {
    const recipe = await this.usersService.create(newUserData);
    return recipe;
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id') id: string) {
    return this.usersService.remove(id);
  }
}
