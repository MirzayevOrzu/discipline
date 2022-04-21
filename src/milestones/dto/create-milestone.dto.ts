import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMilestoneDto {
  @IsString()
  @IsMongoId()
  objectiveId: string;

  @IsOptional()
  @IsString()
  @IsMongoId()
  owner: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsArray()
  activities: string;
}
