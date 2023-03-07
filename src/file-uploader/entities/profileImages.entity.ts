import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profilePictures')
export class ProfilePictures {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  picture_code: string;
}
