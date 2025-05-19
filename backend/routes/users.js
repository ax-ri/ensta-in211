import express from 'express';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';
import { authCheck, hashPassword } from './auth.js';

const router = express.Router();

router.get('/', authCheck, function (req, res) {
  try {
    appDataSource
      .getRepository(User)
      .find({})
      .then(function (users) {
        res.json({ users: users });
      });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post('/new', async function (req, res) {
  try {
    const userRepository = appDataSource.getRepository(User);
    const newUser = userRepository.create({
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: await hashPassword(req.body.password),
    });

    userRepository
      .insert(newUser)
      .then(function (newDocument) {
        res.status(201).json(newDocument);
      })
      .catch(function (error) {
        console.error(error);
        if (error.code === '23505') {
          res.status(400).json({
            message: `User with email "${newUser.email}" already exists`,
          });
        } else {
          res.status(500).json({ message: 'Error while creating the user' });
        }
      });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.delete('/:userId', authCheck, function (req, res) {
  try {
    appDataSource
      .getRepository(User)
      .delete({ id: req.params.userId })
      .then(function () {
        res.status(204).json({ message: 'User successfully deleted' });
      })
      .catch(function () {
        res.status(500).json({ message: 'Error while deleting the user' });
      });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default router;
