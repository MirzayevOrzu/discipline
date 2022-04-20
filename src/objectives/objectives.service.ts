import { Model } from 'mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Objective, ObjectiveDocument } from './schemas/objective.schema';
import { CreateObjectiveDto } from './dto/create-objective.dto';
import { FindObjectiveDto } from './dto/find-objective.dto';

@Injectable()
export class ObjectivesService {
  constructor(@InjectModel(Objective.name) private objectiveModel: Model<ObjectiveDocument>) {}

  async create(createObjectiveDto: CreateObjectiveDto) {
    const { parentId, owner } = createObjectiveDto;

    if (parentId) {
      await this.findOne({ _id: parentId, owner }, true);
    }

    const createdObjective = await this.objectiveModel.create(createObjectiveDto);

    return createdObjective.toObject();
  }

  async findOne(query: FindObjectiveDto, badReq = false) {
    const objective = await this.objectiveModel.findOne(query);

    if (!objective && badReq) {
      throw new BadRequestException('Do not send non-existent parentId');
    } else if (!objective) {
      throw new NotFoundException('Objective with data sent not found');
    }

    return objective.toObject();
  }

  async findAll(query: FindObjectiveDto) {
    return this.objectiveModel.find(query);
  }
}
