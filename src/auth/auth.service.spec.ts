import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/discipline'),
        UsersModule,
        JwtModule.register({
          secret: 'secretKey',
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
