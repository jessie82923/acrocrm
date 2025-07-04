import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from './Customer';

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    tel!: string;

    @ManyToOne(() => Customer, customer => customer.contacts, { onDelete: 'CASCADE' })
    customer!: Customer;
}
