import { Role } from "resources/role/user.enum";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Users extends BaseEntity{
   @PrimaryGeneratedColumn()
   id: number;
   @Column()
   fullname : string;

   @Column({ unique: true })
   email: string;
   
   @Column({ nullable: true })
   password: string;

   @Column({ nullable: true , default:"http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"})
   avatar: string;

   @Column({type: 'enum',enum: Role,default: Role.Brand})
   roles: Role;

   @Column({ default: false })
   isVerify: boolean;
   
   @CreateDateColumn()
   createAt: Date;

   @UpdateDateColumn()
   updateAt: Date;
}