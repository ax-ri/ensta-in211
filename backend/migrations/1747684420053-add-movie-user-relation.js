/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export default class AddMovieUserRelation1747684420053 {
  name = 'AddMovieUserRelation1747684420053';

  async up(queryRunner) {
    await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "userId" uuid
        `);
    await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "FK_ec7ed42b2e89092919129bdf990" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "FK_ec7ed42b2e89092919129bdf990"
        `);
    await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "userId"
        `);
  }
}
