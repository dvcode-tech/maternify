import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './user';

export enum NotificationType {
  NOTE = 0,
  POST = 1,
}

export enum NotificationStatus {
  UNREAD = 0,
  READ = 1,
}

@Entity({
  name: 'notifications',
})
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: NotificationType.NOTE })
  type: NotificationType;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column({ type: 'text', nullable: true })
  data: string;

  @Column({ type: 'int', default: NotificationStatus.UNREAD })
  status: NotificationStatus;

  @Column({ type: 'bigint' })
  created_at: number;

  @Column({ type: 'bigint' })
  updated_at: number;
}
