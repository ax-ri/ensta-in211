import express from 'express';
import { appDataSource } from '../datasource.js';
import User, { removeSensitiveFields } from '../entities/user.js';
import { authCheck, hashPassword } from './auth.js';
import Comment from '../entities/comment.js';
import Movie from '../entities/movie.js';

const router = express.Router();

router.get('/', authCheck, async function (req, res) {
  try {
    const commentRepository = appDataSource.getRepository(Comment);
    const comments = await commentRepository
      .createQueryBuilder('comment')
      .innerJoinAndSelect('comment.user', 'user')
      .innerJoinAndSelect('comment.movie', 'movie')
      .where('movie.id = :id', { id: req.query.movie })
      .getMany();
    res.json(
      comments.map((c) => ({ ...c, user: removeSensitiveFields(c.user) })),
    );
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post('/new', authCheck, function (req, res) {
  try {
    const commentRepository = appDataSource.getRepository(Comment);
    const data = {
      date: new Date(),
      movie: req.body.movie,
      user: req.user.id,
      content: req.body.content,
    };
    console.log(data);
    const newComment = commentRepository.create(data);

    commentRepository
      .insert(newComment)
      .then(async function (newDocument) {
        const doc = await commentRepository
          .createQueryBuilder('comment')
          .innerJoinAndSelect('comment.user', 'user')
          .innerJoinAndSelect('comment.movie', 'movie')
          .where('comment.id = :id', { id: newDocument.identifiers[0].id })
          .getOne();
        res.status(201).json({ ...doc, user: removeSensitiveFields(doc.user) });
      })
      .catch(function (error) {
        console.error(error);

        res.status(500).json({ message: 'Error while creating the comment' });
      });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.delete('/:comment', authCheck, async function (req, res) {
  try {
    const commentRepository = appDataSource.getRepository(Comment);
    const comment = await commentRepository
      .createQueryBuilder('comment')
      .innerJoinAndSelect('comment.user', 'user')
      .where('comment.id = :id', { id: req.params.comment })
      .getOne();
    if (comment.user.id != req.user.id) {
      res.sendStatus(403);
      return;
    }

    commentRepository
      .delete({ id: req.params.comment })
      .then(function () {
        res.status(204).json({ message: 'Comment successfully deleted' });
      })
      .catch(function () {
        res.status(500).json({ message: 'Error while deleting the comment' });
      });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default router;
