import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from './Customer.js';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  name;

  @Column()
  tel;

  @ManyToOne(() => Customer, customer => customer.contacts, { onDelete: 'CASCADE' })
  customer;
}
