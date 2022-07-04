import { Column, Entity, ManyToOne } from 'typeorm';
import { IOrganizationLocation } from '../interfaces/organization-location';
import { BaseEntity } from './base-entity';

@Entity()
export class OrganizationLocation
  extends BaseEntity
  implements IOrganizationLocation
{
  @Column()
  @ManyToOne('OrganizationEntity')
  organizationId: string;

  @Column()
  locationName: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  neighborhood: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  complement: string;
}
