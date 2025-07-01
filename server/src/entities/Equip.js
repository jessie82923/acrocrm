import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from './Customer.js';
import { Product } from './Product.js';

@Entity()
export class Equip {
  @PrimaryGeneratedColumn()
  id;

  @ManyToOne(() => Customer, customer => customer.equips, { onDelete: 'CASCADE' })
  customer;

  @ManyToOne(() => Product, product => product.equips, { onDelete: 'CASCADE' })
  product;

  @Column('json')
  detail;
}
