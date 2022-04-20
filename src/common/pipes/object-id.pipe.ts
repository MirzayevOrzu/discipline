import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: string) {
    try {
      if (value) {
        const transformedObjectId = ObjectId.createFromHexString(value);
        return transformedObjectId;
      }
    } catch (error) {
      throw new BadRequestException('"id" is not valid as an ObjectId');
    }
  }
}
