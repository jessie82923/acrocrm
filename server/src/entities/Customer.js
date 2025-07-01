import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Contact } from './Contact.js';
import { License } from './License.js';
import { Equip } from './Equip.js';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  name;

  @OneToMany(() => Contact, contact => contact.customer)
  contacts;

  @OneToMany(() => License, license => license.customer)
  licenses;

  @OneToMany(() => Equip, equip => equip.customer)
  equips;
}
