import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';
import { hashPassword } from '../routes/auth.js';

appDataSource
  .initialize()
  .then(() => {
    const userRepository = appDataSource.getRepository(User);

    const newUser = userRepository.create({
      email: process.env.EMAIL || 'john.doe@test.com',
      firstname: process.env.FIRSTNAME || 'John',
      lastname: process.env.LASTNAME || 'Doe',
      password: hashPassword(process.env.PASSWORD || 'password'),
    });

    userRepository.insert(newUser);

    appDataSource
      .getRepository(User)
      .insert(newUser)
      .then(() => console.log('User inserted'));
  })
  .catch((err) => {
    console.error('Cannot init data source', err);
  });
