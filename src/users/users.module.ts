import { Module } from '@nestjs/common';

import { DateScalar } from './../common/scalars/date.scalar';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolvers';
import { usersProviders } from './users.providers';
import { DatabaseModule } from './../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...usersProviders, UsersResolver, UsersService, DateScalar],
})
export class UsersModule {}
