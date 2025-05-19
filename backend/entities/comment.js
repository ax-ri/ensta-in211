import typeorm from 'typeorm';

const Comment = new typeorm.EntitySchema({
  name: 'Comment',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: String,
    },
    date: { type: Date, required: true },
    content: { type: String, required: true },
  },
  relations: {
    user: {
      target: 'User',
      type: 'many-to-one',
      joinTable: true,
      cascade: true,
    },
    movie: {
      target: 'Movie',
      type: 'many-to-one',
      joinTable: true,
      cascade: true,
    },
  },
});

export default Comment;
