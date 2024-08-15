import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';
import { JourneyComment } from './journey-comment';

@Entity({
  name: 'journeys',
})
export class Journey extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'text', nullable: true })
  image: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'bigint', default: 0 })
  like: number;

  @OneToMany(() => JourneyComment, (comment) => comment.journey)
  comments: JourneyComment[];

  @Column({ type: 'bigint' })
  created_at: number;

  @Column({ type: 'bigint' })
  updated_at: number;
}
