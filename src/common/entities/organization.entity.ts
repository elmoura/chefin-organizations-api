import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomBaseEntity } from './custom-base-entity';
import { IOrganization } from './interfaces/organization';
import { IOrganizationLocation } from './interfaces/organization-location';
import { OrganizationLocation } from './organization-location.entity';

@Entity()
export class Organization extends CustomBaseEntity implements IOrganization {
  @PrimaryGeneratedColumn('uuid')
  organizationId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  @OneToOne('User')
  @JoinColumn({ name: 'organizationRepresentantId' })
  organizationRepresentantId: string;

  @Column()
  businessSegment: string;

  @OneToMany(
    () => OrganizationLocation,
    (location) => location.organizationId,
    { eager: true }
  )
  @JoinColumn({ name: 'organizationId' })
  locations: IOrganizationLocation[];
}
