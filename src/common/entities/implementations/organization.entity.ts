import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { IOrganization } from '../interfaces/organization';
import { IOrganizationLocation } from '../interfaces/organization-location';
import { OrganizationLocation } from './organization-location.entity';

@Entity()
export class Organization extends BaseEntity implements IOrganization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne('User')
  organizationRepresentantId: string;

  businessSegment: string;

  @OneToMany(() => OrganizationLocation, (location) => location.organizationId)
  locations: IOrganizationLocation[];
}
