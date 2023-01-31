import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class NewUserInput {
  @Field()
  @MaxLength(12)
  username: string;

  @Field()
  @MaxLength(12)
  password: string;
}
