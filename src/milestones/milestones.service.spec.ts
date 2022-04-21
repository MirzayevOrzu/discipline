import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { conf } from '../common/configs';
import { ObjectivesModule } from '../objectives/objectives.module';
import { MilestonesService } from './milestones.service';
import { Milestone, milestoneSchema } from './schemas/milestone.schema';

describe('MilestonesService', () => {
  let service: MilestonesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(`mongodb://${conf.db.host}:${conf.db.port}/${conf.db.testName}`),
        MongooseModule.forFeature([{ name: Milestone.name, schema: milestoneSchema }]),
        ObjectivesModule,
      ],
      providers: [MilestonesService],
    }).compile();

    service = module.get<MilestonesService>(MilestonesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have a create method', () => {
    expect(service.create).toBeDefined();
  });

  it('should have a findOne method', () => {
    expect(service.findOne).toBeDefined();
  });

  it('should have a findAll method', () => {
    expect(service.findAll).toBeDefined();
  });
});
