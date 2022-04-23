import { Model } from 'mongoose';
import { ModuleRef } from '@nestjs/core';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Activity, ActivityDocument } from './schemas/activity.schema';
import { CreateActivityDto } from './dto/create-activity.dto';
import { MilestonesService } from '../milestones/milestones.service';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { FindActivityDto } from './dto/find-activity.dto';

@Injectable()
export class ActivitiesService implements OnModuleInit {
  private milestonesService: MilestonesService;

  constructor(
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
    private moduleRef: ModuleRef
  ) {}

  onModuleInit() {
    this.milestonesService = this.moduleRef.get(MilestonesService, { strict: false });
  }

  async create(createActivityDto: CreateActivityDto) {
    const { owner, milestoneId } = createActivityDto;

    const milestone = await this.milestonesService.findOne({ _id: milestoneId, owner });
    const createdActivity = await this.activityModel.create(createActivityDto);

    milestone.activities.push(createdActivity._id);
    await milestone.save();

    return createdActivity;
  }

  createMany(createActivitiesDto: CreateActivityDto[]) {
    return this.activityModel.insertMany(createActivitiesDto, {
      ordered: true,
      lean: true,
      rawResult: true,
    });
  }

  update(query: FindActivityDto, updateActivityDto: UpdateActivityDto) {
    return this.activityModel.findOneAndUpdate({ ...query, completed: false }, updateActivityDto, {
      new: true,
    });
  }
}
