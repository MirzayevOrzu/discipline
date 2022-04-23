import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsString, IsMongoId } from 'class-validator';
import { UpdateActivityDto } from './update-activity.dto';

export class FindActivityDto extends PartialType(
  OmitType(UpdateActivityDto, ['title', 'link'] as const)
) {
  @IsString()
  @IsMongoId()
  _id: string;

  owner: string;
  completed: false;
}
