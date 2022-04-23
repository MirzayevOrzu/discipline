import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { CreateActivityDto } from '../../activities/dto/create-activity.dto';

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

  @IsArray()
  @ValidateIf((o) => typeof o.activities[0] === 'object')
  @ValidateNested({ each: true })
  @Type(() => CreateActivityDto)
  activities: CreateActivityDto[] | string[];
}
