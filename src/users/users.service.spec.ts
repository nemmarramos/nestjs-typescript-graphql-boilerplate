import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './users.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'USER_REPOSITORY',
          useValue: {
            insert: jest
              .fn()
              .mockResolvedValue({ generatedMaps: [{ id: '123' }] }),
            findOne: jest
              .fn()
              .mockResolvedValue({ id: '123', username: 'John Doe' }),
            find: jest
              .fn()
              .mockResolvedValue([{ id: '123', username: 'John Doe' }]),
            delete: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>('USER_REPOSITORY');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('creates a new user', async () => {
      const user = await service.create({
        username: 'John Doe',
        password: 'samplepassword',
      });
      expect(repository.insert).toHaveBeenCalledWith({
        username: 'John Doe',
        password: 'samplepassword',
      });
      expect(user).toEqual({
        id: '123',
        username: 'John Doe',
        password: 'samplepassword',
      });
    });
  });

  describe('findOneById', () => {
    it('finds one user by id', async () => {
      const user = await service.findOneById('123');
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '123' } });
      expect(user).toEqual({ id: '123', username: 'John Doe' });
    });
  });

  describe('findAll', () => {
    it('finds all users', async () => {
      const users = await service.findAll({ limit: 10, offset: 0 });
      expect(repository.find).toHaveBeenCalledWith({ skip: 0, take: 10 });
      expect(users).toEqual([{ id: '123', username: 'John Doe' }]);
    });
  });

  describe('remove', () => {
    it('removes a user by id', async () => {
      const result = await service.remove('123');
      expect(repository.delete).toHaveBeenCalledWith('123');
      expect(result).toBe(true);
    });
  });
});
