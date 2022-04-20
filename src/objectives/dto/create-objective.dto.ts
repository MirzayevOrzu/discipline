import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ObjectiveType } from '../../common/constants/objective-type.constant';

export class CreateObjectiveDto {
  @IsOptional()
  @IsString()
  @IsMongoId()
  parentId: string;

  @IsOptional()
  @IsString()
  @IsMongoId()
  owner: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ObjectiveType)
  type: ObjectiveType;

  @IsArray()
  @IsString({ each: true })
  motives: string[];
}
