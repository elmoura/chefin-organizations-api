import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ICustomBaseEntity } from './interfaces/custom-base-entity';

export class CustomBaseEntity implements ICustomBaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
