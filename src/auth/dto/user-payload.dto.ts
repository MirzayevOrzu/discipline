import { IsMongoId, IsString } from 'class-validator';

export class UserPayloadDto {
  @IsString()
  @IsMongoId()
  userId: string;
}
