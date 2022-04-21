import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { conf } from '../common/configs';
import { ObjectivesService } from './objectives.service';
import { Objective, objectiveSchema } from './schemas/objective.schema';

describe('ObjectivesService', () => {
  let service: ObjectivesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(`mongodb://${conf.db.host}:${conf.db.port}/${conf.db.testName}`),
        MongooseModule.forFeature([{ name: Objective.name, schema: objectiveSchema }]),
      ],
      providers: [ObjectivesService],
    }).compile();

    service = module.get<ObjectivesService>(ObjectivesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have create method', () => {
    expect(service.create).toBeDefined();
  });

  it('should have findOne method', () => {
    expect(service.findOne).toBeDefined();
  });

  it('should have findAll method', () => {
    expect(service.findAll).toBeDefined();
  });
});
