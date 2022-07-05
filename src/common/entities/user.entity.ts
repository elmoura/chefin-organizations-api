import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IUser } from './interfaces/user';
import { CustomBaseEntity } from './custom-base-entity';
import { Organization } from './organization.entity';

@Entity()
export class User extends CustomBaseEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'organizationId' })
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
