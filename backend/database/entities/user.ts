import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Personnel } from './personnel';

export enum UserType {
  ADMIN = 999,
  PERSONNEL = 199,
  ENDUSER = 1,
}

export enum UserStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  BLOCK = 2,
}

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  principal_id: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'int', default: UserType.ENDUSER })
  user_type: UserType;

  @Column({ type: 'text', nullable: true })
  mobile_number: string;

  @Column({ type: 'int', default: '01-01-1970' })
  birth_date: string;

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

  @Column({ type: 'text', nullable: true })
  banner_photo: string;

  @Column({ type: 'int', default: UserStatus.ACTIVE })
  status: UserStatus;

  @OneToOne(() => Personnel, (personnel) => personnel.user)
  personnel: Personnel;

  @Column({ type: 'bigint' })
  created_at: number;

  @Column({ type: 'bigint' })
  updated_at: number;
}
