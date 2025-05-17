import { Role } from 'src/roles/role.entity';
import { BaseEntity, Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn, JoinTable } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, role => role.users, { cascade: true })
  @JoinTable()
  roles: Role[];

  get permissionCodes() {
    return ['create-users', 'list-products'];
  }
}
