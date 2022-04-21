import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { conf } from '../common/configs';
import { ObjectivesController } from './objectives.controller';
import { ObjectivesService } from './objectives.service';
import { Objective, objectiveSchema } from './schemas/objective.schema';

describe('ObjectivesController', () => {
  let controller: ObjectivesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(`mongodb://${conf.db.host}:${conf.db.port}/${conf.db.testName}`),
        MongooseModule.forFeature([{ name: Objective.name, schema: objectiveSchema }]),
      ],
      controllers: [ObjectivesController],
      providers: [ObjectivesService],
    }).compile();

    controller = module.get<ObjectivesController>(ObjectivesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have create method', () => {
    expect(controller.create).toBeDefined();
  });

  it('should have findOne method', () => {
    expect(controller.findOne).toBeDefined();
  });

  it('should have findAll method', () => {
    expect(controller.findAll).toBeDefined();
  });
});
