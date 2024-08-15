import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';

@Entity({
  name: 'feedbacks',
})
export class Feedback extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  patient: User;

  @ManyToOne(() => User)
  personnel: User;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'int', default: 5 })
  rate: number;

  @Column({ type: 'bigint' })
  created_at: number;

  @Column({ type: 'bigint' })
  updated_at: number;
}
