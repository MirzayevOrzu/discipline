import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MilestonesService } from './milestones.service';
import { MilestonesController } from './milestones.controller';
import { Milestone, milestoneSchema } from './schemas/milestone.schema';
import { ObjectivesModule } from '../objectives/objectives.module';
import { ActivitiesModule } from '../activities/activities.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Milestone.name, schema: milestoneSchema }]),
    ObjectivesModule,
    ActivitiesModule,
  ],
  controllers: [MilestonesController],
  providers: [MilestonesService],
})
export class MilestonesModule {}
