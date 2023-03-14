import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity('UserPosts')
export class UserPosts {
  @PrimaryGeneratedColumn()
  user_id: number;
  @Column()
  description: string;

  @Column('number', { nullable: true })
  image_id: number | null;

  @Column('timestamp without time zone', { name: 'created_at', nullable: true })
  created_at: Date | null;

  @Column('timestamp without time zone', { name: 'updated_at', nullable: true })
  updated_at: Date | null;
}
