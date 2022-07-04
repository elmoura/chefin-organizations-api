import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../interfaces/user';
import { BaseEntity } from './base-entity';
import { Organization } from './organization.entity';

@Entity()
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ManyToOne(() => Organization)
  organizationId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
