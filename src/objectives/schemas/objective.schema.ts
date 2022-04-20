import { Document, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schemas } from '../../common/constants/schemas.contant';
import { enumToArray } from '../../common/utils/enum2arr.util';
import { ObjectiveType } from '../../common/constants/objective-type.constant';

export type ObjectiveDocument = Objective & Document;

@Schema({
  timestamps: true,
})
export class Objective {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Schemas.OBJECTIVE,
  })
  parentId: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Schemas.USER,
    required: true,
  })
  owner: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    enum: enumToArray(ObjectiveType),
    required: true,
  })
  type: ObjectiveType;

  @Prop({
    type: [String],
  })
  motives: string[];

  @Prop({
    default: false,
  })
  achieved: boolean;
}

export const objectiveSchema = SchemaFactory.createForClass(Objective);
