import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { License } from './License.js';
import { Equip } from './Equip.js';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  name;

  @OneToMany(() => License, license => license.product)
  licenses;

  @OneToMany(() => Equip, equip => equip.product)
  equips;
}
