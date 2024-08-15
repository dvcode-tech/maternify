import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';
import { Location } from './location';

export enum PersonnelType {
  MIDWIFE = 0,
  OBGYN = 1,
}

export enum PersonnelStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  BLOCK = 2,
}

@Entity({
  name: 'personnels',
})
export class Personnel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.personnel)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Location, (location) => location.personnels)
  location: Location;

  @Column({ type: 'int', default: PersonnelType.OBGYN })
  personnel_type: PersonnelType;

  @Column({ type: 'text', unique: true })
  bio: string;

  @Column({ type: 'int', default: PersonnelStatus.ACTIVE })
  status: PersonnelStatus;

  @Column({ type: 'bigint' })
  created_at: number;

  @Column({ type: 'bigint' })
  updated_at: number;
}
