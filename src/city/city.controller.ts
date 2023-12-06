import { Body, Controller, Post, Res, Get, Put, Delete, Param } from '@nestjs/common';
import { CityService } from './city.service';
import { Response } from 'express';

@Controller('/city')
export class CityController {
    constructor(
        private readonly cityService:CityService
    ){}

    @Get()
    GetCity(@Res() res:Response) {
        return this.cityService.GetCity(res)
    }

    @Get(':id')
    GetOneCity(@Res() res: Response, @Param('id') id:number) {
        return this.cityService.GetOneCity(id, res)
    }

    @Post()
    AddCity(@Body() body:{city_name:string}, @Res() res:Response) {
        return this.cityService.AddCity(body.city_name, res)
    }

    @Put()
    UpdateCity(@Body() body:{id:number, city_name: string}, @Res() res:Response) {
        return this.cityService.UpdateCity(body.id, body.city_name, res)
    }

    @Delete(':id')
    DeleteCity(@Param('id') id:number, @Res() res:Response) {
        return this.cityService.DeleteCity(id, res)
    }

}
