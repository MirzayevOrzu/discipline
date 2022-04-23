import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateActivityDto {
  @IsOptional()
  @IsString()
  @IsMongoId()
  owner: string;

  @IsOptional()
  @IsString()
  @IsMongoId()
  milestoneId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  link: string;
}
