import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { airport } from './airport.entity';
import { aircraft } from './aircraft.entity';

@Entity()
export class airport_aircraft {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => airport, airport => airport.id)
    airport_: airport;

    @ManyToOne(() => aircraft, aircraft => aircraft.id)
    aircraft_: aircraft
}
