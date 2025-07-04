import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from './Customer';
import { Product } from './Product';

@Entity()
export class Equip {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Customer, customer => customer.equips, { onDelete: 'CASCADE' })
    customer!: Customer;

    @ManyToOne(() => Product, product => product.equips, { onDelete: 'CASCADE' })
    product!: Product;

    @Column('json')
    detail!: any;
}
