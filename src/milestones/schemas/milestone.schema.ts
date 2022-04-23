import { Document, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schemas } from '../../common/constants/schemas.contant';

export type MilestoneDocument = Milestone & Document;

@Schema({
  timestamps: true,
})
export class Milestone {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Schemas.OBJECTIVE,
    required: true,
  })
  objectiveId: string;

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
    type: [SchemaTypes.ObjectId],
    ref: Schemas.ACTIVITY,
  })
  activities: string[];

  @Prop({
    default: false,
  })
  completed: boolean;
}

export const milestoneSchema = SchemaFactory.createForClass(Milestone);
