import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';
import { ConsultationComment } from './consultation-comment';

@Entity({
  name: 'consultations',
})
export class Consultation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  patient: User;

  @ManyToOne(() => User)
  personnel: User;

  @Column({ type: 'text', nullable: true })
  content: string;

  @OneToMany(() => ConsultationComment, (comment) => comment.consultation)
  comments: ConsultationComment[];

  @Column({ type: 'bigint' })
  created_at: number;

  @Column({ type: 'bigint' })
  updated_at: number;
}
