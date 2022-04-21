import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { UserPayloadDto } from '../auth/dto/user-payload.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../common/decorators/CurrentUser';
import { ParseObjectIdPipe } from '../common/pipes/object-id.pipe';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { FindMilestoneDto } from './dto/find-milestone.dto';
import { MilestonesService } from './milestones.service';

@Controller('milestones')
export class MilestonesController {
  constructor(private readonly milestonesService: MilestonesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMilestoneDto: CreateMilestoneDto, @CurrentUser() user: UserPayloadDto) {
    return this.milestonesService.create({ ...createMilestoneDto, owner: user.userId });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string, @CurrentUser() user: UserPayloadDto) {
    return this.milestonesService.findOne({ _id: id, owner: user.userId });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: FindMilestoneDto, @CurrentUser() user: UserPayloadDto) {
    return this.milestonesService.findAll({ ...query, owner: user.userId });
  }
}
