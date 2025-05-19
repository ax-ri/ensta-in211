/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export default class AddComment1747685628429 {
  name = 'AddComment1747685628429';

  async up(queryRunner) {
    await queryRunner.query(`
            CREATE TABLE "comment" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "date" TIMESTAMP NOT NULL,
                "content" character varying NOT NULL,
                "movieId" uuid,
                "userId" uuid,
                CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
        ALTER TABLE "comment"
        ADD CONSTRAINT "FK_ec7ed42b2e89092919129bdf770" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE NO ACTION
                                                                                                            
    `);

    await queryRunner.query(`
        ALTER TABLE "comment"
        ADD CONSTRAINT "FK_ec7ed42b2e89092919129bdf880" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
      ALTER TABLE "comment" DROP CONSTRAINT "FK_ec7ed42b2e89092919129bdf770"
    `);

    await queryRunner.query(`
      ALTER TABLE "comment" DROP CONSTRAINT "FK_ec7ed42b2e89092919129bdf880"
    `);

    await queryRunner.query(`
        DROP TABLE "comment"
    `);
  }
}
