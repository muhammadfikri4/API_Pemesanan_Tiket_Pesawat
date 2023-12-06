import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import { airport } from './airport.entity';
import { airport_aircraft } from './airport_aircraft.entity';

@Entity()
export class aircraft {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty({message: "Airplane Name is can't be empty!"})
    aircraft_name: string

    @Column()
    @IsNotEmpty({message: "Airplane Code is can't be empty!"})
    aircraft_code: string
    
    @Column()
    @IsNotEmpty({message: "Seat Ammount is can't be empty!"})
    seat_ammount: number

    @OneToMany(() => airport_aircraft, airport_aircraft => airport_aircraft.aircraft_)
    aircraft_: airport_aircraft[]
}

