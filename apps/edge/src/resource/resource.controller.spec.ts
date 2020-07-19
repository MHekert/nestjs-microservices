import { Test, TestingModule } from '@nestjs/testing';
import { ResourceController } from './resource.controller';
import { LoggerService } from '../../../../libs/logger/src';
import { ResourceService } from './resource.service';

describe('Resource Controller', () => {
  let controller: ResourceController;
  const loggerMock = { log: jest.fn().mockImplementation(arg => arg) };
  let resourceServiceMock;

  beforeEach(async () => {
    resourceServiceMock = {
      insert: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResourceController],
      providers: [
        {
          provide: ResourceService,
          useValue: resourceServiceMock,
        },
        {
          provide: LoggerService,
          useValue: loggerMock,
        },
      ],
    }).compile();

    controller = module.get<ResourceController>(ResourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
