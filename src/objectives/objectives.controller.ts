import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ParseObjectIdPipe } from '../common/pipes/object-id.pipe';
import { UserPayloadDto } from '../auth/dto/user-payload.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../common/decorators/CurrentUser';
import { CreateObjectiveDto } from './dto/create-objective.dto';
import { FindObjectiveDto } from './dto/find-objective.dto';
import { ObjectivesService } from './objectives.service';

@Controller('objectives')
export class ObjectivesController {
  constructor(private readonly objectivesService: ObjectivesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createObjectiveDto: CreateObjectiveDto, @CurrentUser() user: UserPayloadDto) {
    return this.objectivesService.create({ ...createObjectiveDto, owner: user.userId });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string, @CurrentUser() user: UserPayloadDto) {
    return this.objectivesService.findOne({ _id: id, owner: user.userId });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: FindObjectiveDto, @CurrentUser() user: UserPayloadDto) {
    return this.objectivesService.findAll({ owner: user.userId, ...query });
  }
}
