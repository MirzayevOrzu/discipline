import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Activity, ActivityDocument } from './schemas/activity.schema';
import { CreateActivityDto } from './dto/create-activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(@InjectModel(Activity.name) private activityModel: Model<ActivityDocument>) {}

  createMany(createActivitiesDto: CreateActivityDto[]) {
    return this.activityModel.insertMany(createActivitiesDto, {
      ordered: true,
      lean: true,
      rawResult: true,
    });
  }
}
