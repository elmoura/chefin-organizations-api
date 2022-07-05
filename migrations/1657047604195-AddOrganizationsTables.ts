import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrganizationsTables1657047604195 implements MigrationInterface {
  name = 'AddOrganizationsTables1657047604195';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "organization_location" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "locationId" uuid NOT NULL DEFAULT uuid_generate_v4(), "organizationId" uuid, "locationName" character varying, "city" character varying NOT NULL, "state" character varying NOT NULL, "neighborhood" character varying NOT NULL, "postalCode" character varying NOT NULL, "street" character varying NOT NULL, "number" character varying NOT NULL, "complement" character varying, CONSTRAINT "PK_f74229107f419cd6dcd1a52782f" PRIMARY KEY ("locationId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "organization" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "organizationId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "organizationRepresentantId" uuid, "businessSegment" character varying NOT NULL, CONSTRAINT "REL_6c75b5e6a59c17d7b9f301acbc" UNIQUE ("organizationRepresentantId"), CONSTRAINT "PK_7867970695572b3f6561516414d" PRIMARY KEY ("organizationId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "organizationId" uuid NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`
    );
    await queryRunner.query(
      `ALTER TABLE "organization_location" ADD CONSTRAINT "FK_d0b805eaab35fd9ca281e029ec9" FOREIGN KEY ("organizationId") REFERENCES "organization"("organizationId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "organization" ADD CONSTRAINT "FK_6c75b5e6a59c17d7b9f301acbcd" FOREIGN KEY ("organizationRepresentantId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_dfda472c0af7812401e592b6a61" FOREIGN KEY ("organizationId") REFERENCES "organization"("organizationId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_dfda472c0af7812401e592b6a61"`
    );
    await queryRunner.query(
      `ALTER TABLE "organization" DROP CONSTRAINT "FK_6c75b5e6a59c17d7b9f301acbcd"`
    );
    await queryRunner.query(
      `ALTER TABLE "organization_location" DROP CONSTRAINT "FK_d0b805eaab35fd9ca281e029ec9"`
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "organization"`);
    await queryRunner.query(`DROP TABLE "organization_location"`);
  }
}
