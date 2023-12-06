import { Body, Controller, Post, Res, Get, Put, Delete, Param } from '@nestjs/common';
import { AirplaneService } from './airplane.service';
import { Response } from 'express';

@Controller('airplane')
export class AirplaneController {
    constructor(
        private readonly airplaneService:AirplaneService
    ){}
    
    @Post()
    AddAirplane(@Body() body:{airplane_code:string, airplane_name:string, seat_ammount:number, }, @Res() res:Response) {
        return this.airplaneService.AddAirplane(body.airplane_code, body.airplane_name, body.seat_ammount, res)
    }
    
    @Get() 
    GetAirplane(@Res() res:Response) {
        return this.airplaneService.GetAirplane(res);
    }

    @Get(':id') 
    GetOneAirplane(@Param('id') id: number, @Res() res:Response) {
        return this.airplaneService.GetOneAirplane(id, res)
    }

    @Put()
    UpdateAirplane(@Body() body:{id: number, airplane_name: string, airplane_code:string, seat_ammount:number}, @Res() res:Response) {
        return this.airplaneService.UpdateAirplane(body.id, body.airplane_name, body.airplane_code, body.seat_ammount, res)
    }

    @Delete(':id')
    DeleteAirplane(@Param('id') id:number, @Res() res:Response) {
        return this.airplaneService.DeleteAirplane(id, res)
    }
}
