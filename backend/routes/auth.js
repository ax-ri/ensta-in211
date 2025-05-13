import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Router } from 'express';

import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';
import * as bcrypt from 'bcryptjs';

function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export function main(app) {
  // Set up local strategy
  passport.use(new LocalStrategy.Strategy(localVerify));

  // Make the app use passport authentication middleware
  app.use(passport.initialize());

  // Add session mechanism to avoid re-enter credentials on each request
  app.use(passport.session());
  // Needed to properly save and restore the user data in the session
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
}

const localVerify = async function (username, password, done) {
  try {
    const user = await appDataSource
      .getRepository(User)
      .findOneBy({ email: username });
    console.log(user);

    if (!user) {
      return done(null, false);
    }

    // Password match => authentication is successful
    if (await comparePassword(password, user.password)) {
      // remove the password from the user session data
      delete user.password;
      return done(null, user);
    } else {
      // no error but wrong password
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
};

export function authCheck(req, res, next) {
  /* See https://stackoverflow.com/a/38820680 for more details on the code below */
  console.log(req.user);

  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(401); // Unauthorized
  }
}

export const router = Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});
router.post('/logout', (req, res) =>
  req.logout((err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  }),
);
router.get('/check', authCheck, (req, res) => {
  res.json(req.user);
});
