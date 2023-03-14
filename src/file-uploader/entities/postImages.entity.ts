import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('PostImages')
export class PostImages {
  @PrimaryGeneratedColumn()
  image_id: number;

  @Column('character', { nullable: false })
  hint: string;
}
