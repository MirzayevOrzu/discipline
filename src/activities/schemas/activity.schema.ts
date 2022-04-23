import { Document, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schemas } from '../../common/constants/schemas.contant';

export type ActivityDocument = Activity & Document;

@Schema({
  timestamps: true,
})
export class Activity {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Schemas.MILESTONE,
    required: true,
  })
  milestoneId: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Schemas.USER,
    required: true,
  })
  owner: string;

  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  link: string;

  @Prop({
    default: false,
  })
  completed: boolean;
}

export const activitySchema = SchemaFactory.createForClass(Activity);
