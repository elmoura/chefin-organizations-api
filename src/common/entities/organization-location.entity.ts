import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IOrganizationLocation } from './interfaces/organization-location';
import { CustomBaseEntity } from './custom-base-entity';

@Entity()
export class OrganizationLocation
  extends CustomBaseEntity
  implements IOrganizationLocation
{
  @PrimaryGeneratedColumn('uuid')
  locationId: string;

  @Column({ nullable: true })
  @ManyToOne('Organization')
  @JoinColumn({ name: 'organizationId' })
  organizationId: string;

  @Column({ nullable: true })
  locationName: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  neighborhood: string;

  @Column()
  postalCode: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column({ nullable: true })
  complement: string;
}
