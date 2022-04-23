import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ParseObjectIdPipe } from 'src/common/pipes/object-id.pipe';
import { UserPayloadDto } from '../auth/dto/user-payload.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../common/decorators/CurrentUser';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { FindActivityDto } from './dto/find-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createActivityDto: CreateActivityDto, @CurrentUser() user: UserPayloadDto) {
    return this.activitiesService.create({ ...createActivityDto, owner: user.userId });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateActivityDto: UpdateActivityDto,
    @CurrentUser() user: UserPayloadDto
  ) {
    return this.activitiesService.update(
      { _id: id, owner: user.userId } as FindActivityDto,
      updateActivityDto
    );
  }
}
