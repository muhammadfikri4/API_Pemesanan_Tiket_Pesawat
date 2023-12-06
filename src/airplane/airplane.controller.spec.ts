import { Test, TestingModule } from '@nestjs/testing';
import { AirplaneController } from './airplane.controller';

describe('AirplaneController', () => {
  let controller: AirplaneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AirplaneController],
    }).compile();

    controller = module.get<AirplaneController>(AirplaneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
