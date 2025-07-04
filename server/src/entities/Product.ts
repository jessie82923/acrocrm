import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { License } from './License';
import { Equip } from './Equip';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => License, license => license.product)
    licenses!: License[];

    @OneToMany(() => Equip, equip => equip.product)
    equips!: Equip[];
}
