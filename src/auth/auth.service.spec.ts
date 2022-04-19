import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { conf } from '../common/configs';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(`mongodb://${conf.db.host}:${conf.db.port}/${conf.db.name}`),
        UsersModule,
        JwtModule.register({
          secret: conf.jwt.secret,
        }),
      ],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have login method', () => {
    expect(service.login).toBeDefined();
  });

  it('should have validateUser method', () => {
    expect(service.validateUser).toBeDefined();
  });
});
