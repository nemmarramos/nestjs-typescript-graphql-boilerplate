import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: process.env.NODE_ENV === 'production' ? 'mysql' : 'sqlite',
        host: process.env.NODE_ENV === 'production' ? 'localhost' : undefined,
        port: process.env.NODE_ENV === 'production' ? 3306 : undefined,
        username: process.env.NODE_ENV === 'production' ? 'root' : undefined,
        password: process.env.NODE_ENV === 'production' ? 'root' : undefined,
        database: process.env.NODE_ENV === 'production' ? 'test' : ':memory:',
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: process.env.NODE_ENV !== 'production',
      });

      return dataSource.initialize();
    },
  },
];
