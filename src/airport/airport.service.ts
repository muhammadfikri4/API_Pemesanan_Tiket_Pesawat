import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { airport } from 'src/Model/airport.entity';
import { airport_aircraft } from 'src/Model/airport_aircraft.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AirportService {
    constructor(
        @InjectRepository(airport)
        private airportRepository: Repository<airport>,
        @InjectRepository(airport_aircraft)
        private airportAircraftRepository: Repository<airport_aircraft>,
    ){}

    async Airport():Promise<any> {
        // const data = await this.airportAircraftRepository.createQueryBuilder('airport_aircraft')
        // .innerJoinAndSelect('airport_aircraft.airport_', 'airport')
        // .innerJoinAndSelect('airport_aircraft.aircraft_', 'aircraft')
        // .innerJoinAndSelect('airport.city_', 'airport_city')
        // .where('airport_aircraft.airport_ = :airport_id', { airport_id: aiportId }) 
        // .getMany();
      
        // return {data, count: data.length}
        const airportData = await this.airportRepository.createQueryBuilder('airport')
        .innerJoinAndSelect('airport.city_', 'airport_city')
        .getMany();

        return {data: airportData, count: airportData.length}
      }
}
