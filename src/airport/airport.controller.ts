import { Controller, Get, Param } from '@nestjs/common';
import { AirportService } from './airport.service';

@Controller('airport')
export class AirportController {
    constructor(
        private airportService:AirportService
    ) {}
    @Get() 
    Airport() {
        return this.airportService.Airport()
    }
}
