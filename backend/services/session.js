import session from 'express-session';
export function main(app) {
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET || 'session-secret',
      cookie: {
        secure: false, //process.env.NODE_ENV !== 'development',
        httpOnly: true,
      },
      // store: new TypeormStore({
      //   cleanupLimit: 2,
      //   ttl: 86400,
      // }).connect(sessionRepository),
    }),
  );
}
