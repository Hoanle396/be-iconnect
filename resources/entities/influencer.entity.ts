import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./user.entity";
@Entity()
export class Influencer extends BaseEntity{
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ nullable: false, default: 'Tik Tok' })
   platform: string;

   @Column({nullable:false})
   username: string;

   @Column({ nullable: true })
   services: string;
   
   @Column({ nullable: true })
   avatar: string;

   @Column({ default: 0 })
   completes: number;

   @Column({ default: 0 })
   subscribers: number;

   @Column({ default: 0 })
   views: number;

   @Column({ nullable: true })
   location: string;

   @OneToOne((type) => Users, (us) => us.id)
   @JoinColumn({name:'user_id'})
   user: Users;
}