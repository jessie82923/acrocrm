import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from './Customer.js';
import { Product } from './Product.js';

@Entity()
export class License {
  @PrimaryGeneratedColumn()
  id;

  @ManyToOne(() => Customer, customer => customer.licenses, { onDelete: 'CASCADE' })
  customer;

  @ManyToOne(() => Product, product => product.licenses, { onDelete: 'CASCADE' })
  product;

  @Column('json')
  license;
}
