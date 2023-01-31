import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../../src/app.module';
import { UsersService } from '../../src/users/users.service';

describe('Users GraphQL (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersService)
      .useValue({
        create: jest.fn().mockResolvedValue({
          id: '21',
          username: 'testuser21',
          password: 'password',
        }),
        findAll: jest.fn().mockResolvedValue([
          {
            id: '1',
            username: 'testuser1',
            password: 'password',
          },
        ]),
        findOneById: jest.fn().mockResolvedValue({
          id: '1111',
          username: 'testuser1111',
          password: 'password',
        }),
        remove: jest.fn().mockResolvedValue(true),
      })
      .compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app?.close();
  });

  it('Should create a user', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation  {
            addUser(newUserData: {
              username: "testuser21",
              password: "password"
            }) {
              id
              username
              password
            }
          }
        `,
      })
      .expect(200)
      .expect({
        data: {
          addUser: {
            id: '21',
            username: 'testuser21',
            password: 'password',
          },
        },
      });
  });

  it('Should fetch all users', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          {
            users(offset: 0, limit: 2) {
              id
              username
              password
            }
          }
        `,
      })
      .expect(200)
      .expect({
        data: {
          users: [
            {
              id: '1',
              username: 'testuser1',
              password: 'password',
            },
          ],
        },
      });
  });

  it('Should fetch a user', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          {
            user(id: "1111") {
              id
              username
              password
            }
          }
        `,
      })
      .expect(200)
      .expect({
        data: {
          user: {
            id: '1111',
            username: 'testuser1111',
            password: 'password',
          },
        },
      });
  });

  it('Should remove a user', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            removeUser(id: "1")
          }
        `,
      })
      .expect(200)
      .expect({
        data: {
          removeUser: true,
        },
      });
  });
});
