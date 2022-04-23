import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsBoolean } from 'class-validator';
import { CreateActivityDto } from './create-activity.dto';

export class UpdateActivityDto extends PartialType(
  OmitType(CreateActivityDto, ['owner', 'milestoneId'] as const)
) {
  @IsOptional()
  @IsBoolean()
  completed: boolean;
}
