import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { CreateObjectiveDto } from './create-objective.dto';

export class FindObjectiveDto extends PartialType(
  OmitType(CreateObjectiveDto, ['motives'] as const)
) {
  @IsOptional()
  @IsString()
  @IsMongoId()
  _id: string;
}
