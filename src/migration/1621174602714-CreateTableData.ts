import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableData1621174602714 implements MigrationInterface {
    name = 'CreateTableData1621174602714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "data" ("Id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "desc" character varying(5000) NOT NULL DEFAULT 'NONE', "lang" character varying(100) NOT NULL DEFAULT 'NONE', "star" integer NOT NULL DEFAULT '0', "forked" integer NOT NULL DEFAULT '0', "starToday" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_a9f9f453b606e9266a6d46322a3" UNIQUE ("name"), CONSTRAINT "PK_e49728805d2845c8206f13217c9" PRIMARY KEY ("Id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "data"`);
    }

}
