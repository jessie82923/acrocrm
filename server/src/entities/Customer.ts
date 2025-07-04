import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Contact } from './Contact';
import { License } from './License';
import { Equip } from './Equip';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Contact, contact => contact.customer)
    contacts!: Contact[];

    @OneToMany(() => License, license => license.customer)
    licenses!: License[];

    @OneToMany(() => Equip, equip => equip.customer)
    equips!: Equip[];
}
