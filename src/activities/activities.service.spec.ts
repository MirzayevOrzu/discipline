import { Test, TestingModule } from '@nestjs/testing';
import { ActivitiesService } from './activities.service';

describe('ActivitiesService', () => {
  let service: ActivitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivitiesService],
    }).compile();

    service = module.get<ActivitiesService>(ActivitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have createMany method', async () => {
    expect(service.createMany).toBeDefined();
  });

  it('should have create method', async () => {
    expect(service.create).toBeDefined();
  });

  it('should have update method', async () => {
    expect(service.update).toBeDefined();
  });
});
