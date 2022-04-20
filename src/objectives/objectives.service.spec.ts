import { Test, TestingModule } from '@nestjs/testing';
import { ObjectivesService } from './objectives.service';

describe('ObjectivesService', () => {
  let service: ObjectivesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
