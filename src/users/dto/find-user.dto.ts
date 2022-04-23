import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class FindUserDto extends PartialType(
  OmitType(CreateUserDto, ['firstName', 'lastName', 'password'] as const)
) {
  @IsString()
  @IsMongoId()
  _id?: string;
}
