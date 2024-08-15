import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';
import { Consultation } from './consultation';

@Entity({
  name: 'consultation_comments',
})
export class ConsultationComment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Consultation, (consultation) => consultation.comments)
  consultation: Consultation;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'bigint' })
  created_at: number;

  @Column({ type: 'bigint' })
  updated_at: number;
}
