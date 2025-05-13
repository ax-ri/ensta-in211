import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: String,
    },
    alt_id: {
      type: String,
      required: false,
      default: '',
    },
    title: {
      type: String,
    },
    overview: { type: String },
    poster_path: { type: String },
    release_date: { type: Date },
    user: { type: String },
  },
});

export default Movie;
