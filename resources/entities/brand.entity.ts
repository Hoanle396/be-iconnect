import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "./user.entity";
@Entity()
export class Brand extends BaseEntity{
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   company_name: string;

   @Column()
   servies: string;
   
   @Column({ default: 1 })
   level: number;
   
   @Column({ nullable: true })
   website: string;

   @Column()
   image: string;

   @Column({nullable:true})
   description: string;

   @Column()
   location: string;

   @CreateDateColumn()
   createAt: Date;

   @UpdateDateColumn()
   updateAt: Date;

   @OneToOne((type) => Users, (us) => us.id)
   @JoinColumn({ name: 'user_id' })
   user: Users;

}