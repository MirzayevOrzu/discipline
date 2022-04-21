import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { conf } from '../common/configs';
import { ObjectivesModule } from '../objectives/objectives.module';
import { MilestonesController } from './milestones.controller';
import { MilestonesService } from './milestones.service';
import { Milestone, milestoneSchema } from './schemas/milestone.schema';

describe('MilestonesController', () => {
  let controller: MilestonesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(`mongodb://${conf.db.host}:${conf.db.port}/${conf.db.testName}`),
        MongooseModule.forFeature([{ name: Milestone.name, schema: milestoneSchema }]),
        ObjectivesModule,
      ],
      controllers: [MilestonesController],
      providers: [MilestonesService],
    }).compile();

    controller = module.get<MilestonesController>(MilestonesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a create method', () => {
    expect(controller.create).toBeDefined();
  });

  it('should have a findOne method', () => {
    expect(controller.findOne).toBeDefined();
  });

  it('should have a findAll method', () => {
    expect(controller.findAll).toBeDefined();
  });
});
