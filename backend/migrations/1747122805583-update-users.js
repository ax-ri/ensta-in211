import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class UpdateUsers1747122805583 {
    name = 'UpdateUsers1747122805583'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "password" character varying NOT NULL
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "password"
        `);
    }
}
