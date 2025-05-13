import typeorm from 'typeorm';

const { MigrationInterface, QueryRunner } = typeorm;

export default class UpdateUsers1747128865454 {
  name = 'UpdateUsers1747128865454';

  async up(queryRunner) {
    await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "user" character varying NOT NULL
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "user"
        `);
  }
}
