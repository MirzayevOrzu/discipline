import { Model } from 'mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 6);

    const createdUser = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return createdUser.toObject();
  }

  async findOne(query: FindUserDto, badReq = false) {
    const user = await this.userModel.findOne(query);

    if (!user && badReq) {
      throw new BadRequestException('Do not send non-existent user data');
    } else if (!user) {
      throw new NotFoundException('User with data sent not found');
    }

    return user.toObject();
  }
}
