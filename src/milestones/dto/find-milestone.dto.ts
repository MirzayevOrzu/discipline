import { BadRequestException } from '@nestjs/common';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsMongoId, IsOptional, IsString } from 'class-validator';
import { CreateMilestoneDto } from './create-milestone.dto';

export class FindMilestoneDto extends PartialType(
  OmitType(CreateMilestoneDto, ['activities', 'name'] as const)
) {
  @IsOptional()
  @IsString()
  @IsMongoId()
  _id?: string;

  @IsOptional()
  // make wrapper decorator for this
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    else if (value === 'true') return true;
    else if (value === 'false') return false;
    else throw new BadRequestException('Invalid value for boolean');
  })
  @IsBoolean()
  completed?: boolean;
}
