import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from '../users/schemas/user.schema';
import { conf } from '../common/configs';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(`mongodb://${conf.db.host}:${conf.db.port}/${conf.db.name}`),
        MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
        JwtModule.register({
          secret: conf.jwt.secret,
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, UsersService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have login method', () => {
    expect(controller.login).toBeDefined();
  });
});
