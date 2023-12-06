import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class airport_country {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    country_name: string;
}
