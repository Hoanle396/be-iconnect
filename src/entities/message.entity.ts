import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createAt: Date;

  @Column('text')
  message: string;

  @Column('text')
  from: string;

  @Column('text')
  to: string;

  @Column({
    type: 'boolean',
    nullable: true,
  })
  delivered: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
  })
   seen: boolean;
}
