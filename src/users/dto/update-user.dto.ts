import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, Length, ValidateIf } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password'] as const)) {
  firstName?: string;
  lastName?: string;
  email?: string;

  @IsString()
  @Length(5, 10)
  newPassword?: string;

  @ValidateIf((o) => o.hasOwnProperty('newPassword'))
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
}
