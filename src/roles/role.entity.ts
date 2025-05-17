import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';

@Entity('roles')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => UserEntity, user => user.roles)
  users: UserEntity[];

  @Column("simple-array")
  permissions: string[];
}
