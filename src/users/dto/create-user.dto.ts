import { IsEmail, IsString, Length } from 'class-validator';
import { IsFullName } from '../../common/decorators/IsFullName';

export class CreateUserDto {
  @IsFullName('fullName')
  fullName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(5, 10)
  password: string;
}
