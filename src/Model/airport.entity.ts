import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinTable, JoinColumn } from 'typeorm';
import { airport_city } from './airport_city.entity';
import { aircraft } from './aircraft.entity';
import { airport_aircraft } from './airport_aircraft.entity';
import { airport_country } from './airport_country.entity';

@Entity()
export class airport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    airport_name: string;

    @Column()
    airport_code: string

    @ManyToOne(() => airport_city, airport_city => airport_city.id)
    @JoinTable({name: 'city_id'})
    city_: airport_city

    @ManyToOne(() => airport_country, airport_country => airport_country.id)
    @JoinTable({name: 'country_id'})
    country_: airport_country

    @OneToMany(() => airport_aircraft, airport_aircraft => airport_aircraft.airport_)
    airport_: airport_aircraft[]
}


