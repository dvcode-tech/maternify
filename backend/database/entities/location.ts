import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Personnel } from './personnel';

export enum LocationStatus {
  HIDDEN = 0,
  SHOWN = 1,
}

export enum LocationType {
  LYING_IN = 0,
  HOSPITAL = 1,
}

@Entity({
  name: 'locations',
})
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: LocationType.HOSPITAL })
  location_type: LocationType;

  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  mobile_number: string;

  @Column({ type: 'text', nullable: true })
  city: string;

  @Column({ type: 'text', nullable: true })
  province: string;

  @Column({ type: 'text', nullable: true })
  region: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'text', nullable: true })
  profile_photo: string;

  @Column({ type: 'int', default: LocationStatus.SHOWN })
  status: LocationStatus;

  @OneToMany(() => Personnel, (personnel) => personnel.location)
  personnels: Personnel[];

  @Column({ type: 'bigint' })
  created_at: number;

  @Column({ type: 'bigint' })
  updated_at: number;
}
