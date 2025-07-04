import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from './Customer';
import { Product } from './Product';

@Entity()
export class License {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Customer, customer => customer.licenses, { onDelete: 'CASCADE' })
    customer!: Customer;

    @ManyToOne(() => Product, product => product.licenses, { onDelete: 'CASCADE' })
    product!: Product;

    @Column('json')
    license!: any;
}
