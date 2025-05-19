import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';
import axios from 'axios';
import { authCheck } from './auth.js';
import { removeSensitiveFields } from '../entities/user.js';

const API_ALT_URL = process.env.API_ALT_URL;
const API_ALT_KEY = process.env.API_ALT_KEY;

function apiAltGet(route) {
  return axios.get(`${API_ALT_URL}${route}?api_key=${API_ALT_KEY}`);
}

const router = express.Router();

router.get('/popular', authCheck, (req, res) => {
  try {
    appDataSource
      .getRepository(Movie)
      .createQueryBuilder('movie')
      .innerJoinAndSelect('movie.user', 'user')
      .getMany()
      .then(function (movies) {
        res.json({
          results: movies.map((m) => ({
            ...m,
            user: removeSensitiveFields(m.user),
          })),
        });
      });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post('/new', authCheck, (req, res) => {
  try {
    const movieRepository = appDataSource.getRepository(Movie);
    const data = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      release_date: req.body.release_date,
      user: req.user.id,
    };
    if (req.body.alt_id) {
      data.alt_id = req.body.alt_id;
    }
    if (req.body.genres) {
      data.genres = req.body.genres;
    }
    const newMovie = movieRepository.create(data);

    movieRepository
      .insert(newMovie)
      .then(function (newDocument) {
        res.status(201).json(newDocument);
      })
      .catch(function (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while creating the movie' });
      });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router
  .route('/:movieId/credits')
  .all(authCheck)
  .get(async (req, res) => {
    try {
      const movie = await appDataSource
        .getRepository(Movie)
        .findOneBy({ id: req.params.movieId });
      if (movie) {
        const altData = movie.alt_id
          ? (await apiAltGet(`/movie/${movie.alt_id}/credits`)).data
          : {};
        res.json({
          ...altData,
        });
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

router
  .route('/:movieId')
  .all(authCheck)
  .get(async (req, res) => {
    try {
      const movie = await appDataSource
        .getRepository(Movie)
        .findOneBy({ id: req.params.movieId });
      if (movie) {
        const altData = movie.alt_id
          ? (await apiAltGet(`/movie/${movie.alt_id}`)).data
          : {};
        res.json({
          ...altData,
          ...movie,
        });
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  })
  .delete((req, res) => {
    try {
      appDataSource
        .getRepository(Movie)
        .delete({ id: req.params.movieId })
        .then(function () {
          res.status(204).json({ message: 'Movie successfully deleted' });
        })
        .catch(function () {
          res.status(500).json({ message: 'Error while deleting the movie' });
        });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

export default router;
