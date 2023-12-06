import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class airport_city {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    city_name: string;
}
