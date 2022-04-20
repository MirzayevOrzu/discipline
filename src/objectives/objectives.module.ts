import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Objective, objectiveSchema } from './schemas/objective.schema';
import { ObjectivesController } from './objectives.controller';
import { ObjectivesService } from './objectives.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Objective.name, schema: objectiveSchema }])],
  controllers: [ObjectivesController],
  providers: [ObjectivesService],
})
export class ObjectivesModule {}
