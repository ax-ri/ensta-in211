import typeorm from 'typeorm';

const { MigrationInterface, QueryRunner } = typeorm;

export default class Update1745912993145 {
  name = 'Update1745912993145';

  async up(queryRunner) {
    await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "alt_id" character varying NOT NULL DEFAULT ''
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "alt_id"
        `);
  }
}
