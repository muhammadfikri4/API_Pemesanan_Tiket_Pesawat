import { Controller, Post, Get, Put, Delete, Body, Res, Param } from '@nestjs/common';
import { CountryService } from './country.service';
import { Response } from 'express';


@Controller('country')
export class CountryController {
    constructor(
        private readonly countryService:CountryService
    ){}

    @Get()
    GetCountry(@Res() res:Response) {
        return this.countryService.GetCountry(res);
    }

    @Get(':id')
    GetOneCountry(@Res() res: Response, @Param('id') id:number) {
        return this.countryService.GetOneCountry(id, res)
    }

    @Post()
    AddCountry(@Body() body:{country_name:string}, @Res() res:Response) {
        return this.countryService.AddCountry(body.country_name, res)
    }

    @Put()
    UpdateCountry(@Body() body:{id:number, country_name: string}, @Res() res:Response):Promise<any> {
        return this.countryService.UpdateCountry(body.id, body.country_name, res)
    }

    @Delete(':id') 
    DeleteCountry(@Param('id') id:number, @Res() res:Response) {
        return this.countryService.DeleteCountry(id, res)
    }
}
