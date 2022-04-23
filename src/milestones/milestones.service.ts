import { Model } from 'mongoose';
import { ModuleRef } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Milestone, MilestoneDocument } from './schemas/milestone.schema';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { ObjectivesService } from '../objectives/objectives.service';
import { FindMilestoneDto } from './dto/find-milestone.dto';
import { ActivitiesService } from '../activities/activities.service';
import { UpdateMilestoneDto } from './dto/update-milestone.dto';

@Injectable()
export class MilestonesService implements OnModuleInit {
  private activitiesService: ActivitiesService;

  constructor(
    private objectivesService: ObjectivesService,
    private moduleRef: ModuleRef,
    @InjectModel(Milestone.name) private milestoneModel: Model<MilestoneDocument>
  ) {}

  onModuleInit() {
    this.activitiesService = this.moduleRef.get(ActivitiesService, { strict: false });
  }

  async create(createMilestoneDto: CreateMilestoneDto) {
    const { owner, objectiveId, activities } = createMilestoneDto;

    await this.objectivesService.findOne({ _id: objectiveId, owner }, true);

    delete createMilestoneDto.activities;
    let createdMilestone = await this.milestoneModel.create(createMilestoneDto);

    const dbRes = await this.activitiesService.createMany(
      activities.map((activity) => ({ ...activity, milestoneId: createdMilestone._id, owner }))
    );

    const activityIds = [];
    for (let index in dbRes.insertedIds) {
      activityIds.push(dbRes.insertedIds[index].toString());
    }

    createdMilestone = await this.update(createdMilestone._id, { activities: activityIds });

    return createdMilestone;
  }

  async findOne(query: FindMilestoneDto, badReq = false) {
    const milestone = await this.milestoneModel.findOne(query).populate('activities');

    if (!milestone && badReq) {
      throw new BadRequestException('Do not send non-existent milestone id');
    } else if (!milestone) {
      throw new NotFoundException('Milestone with data sent not found');
    }

    return milestone;
  }

  async findAll(query: FindMilestoneDto) {
    return this.milestoneModel.find(query).lean();
  }

  update(id: string, updateMilestoneDto: UpdateMilestoneDto) {
    return this.milestoneModel.findByIdAndUpdate(id, updateMilestoneDto, { new: true });
  }
}
