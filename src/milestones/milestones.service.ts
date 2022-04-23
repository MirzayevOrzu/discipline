import { Model } from 'mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Milestone, MilestoneDocument } from './schemas/milestone.schema';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { ObjectivesService } from '../objectives/objectives.service';
import { FindMilestoneDto } from './dto/find-milestone.dto';

@Injectable()
export class MilestonesService {
  constructor(
    private objectivesService: ObjectivesService,
    @InjectModel(Milestone.name) private milestoneModel: Model<MilestoneDocument>
  ) {}

  async create(createMilestoneDto: CreateMilestoneDto) {
    const { owner, objectiveId } = createMilestoneDto;

    await this.objectivesService.findOne({ _id: objectiveId, owner }, true);

    const createdMilestone = await this.milestoneModel.create(createMilestoneDto);

    return createdMilestone.toObject();
  }

  async findOne(query: FindMilestoneDto, badReq = false) {
    const milestone = await this.milestoneModel.findOne(query).lean();

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
