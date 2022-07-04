import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrganizationsTables1656974689295 implements MigrationInterface {
  name = 'AddOrganizationsTables1656974689295';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "organization_location" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "organizationId" character varying NOT NULL, "locationName" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "neighborhood" character varying NOT NULL, "street" character varying NOT NULL, "number" character varying NOT NULL, "complement" character varying NOT NULL, "organizationIdId" uuid, CONSTRAINT "PK_bb9226e64e0b967157b32d8d692" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "organization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "organizationId" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "organizationIdId" uuid, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "organization_location" ADD CONSTRAINT "FK_07c553ae0ed052e7dbae007d243" FOREIGN KEY ("organizationIdId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_b1992c0810048ed59a1b00835d4" FOREIGN KEY ("organizationIdId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_b1992c0810048ed59a1b00835d4"`
    );
    await queryRunner.query(
      `ALTER TABLE "organization_location" DROP CONSTRAINT "FK_07c553ae0ed052e7dbae007d243"`
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "organization"`);
    await queryRunner.query(`DROP TABLE "organization_location"`);
  }
}
