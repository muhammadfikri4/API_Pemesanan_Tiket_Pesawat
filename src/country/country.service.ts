import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { airport_country } from 'src/Model/airport_country.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService {
    constructor(
        @InjectRepository(airport_country)
        private countryRepository:Repository<airport_country>
    ){}

    async AddCountry(country_name:string, res:Response) {
        try {
            if(!country_name) {
                return res.status(400).json({
                    message: 'You cannot enter empty Country data!',
                    
                })
            } 


            const duplicate = await this.countryRepository.findOne({
                where: {
                    country_name
                }
            });
            if(duplicate) {
                return res.status(400).json({
                    message: `${duplicate.country_name} is already exists!`
                })
            }
            const data = await this.countryRepository.save({
                country_name
            })
            return res.status(201).json({
                data,
                message: "Success to add Country!",
                status: 201
            })
        } catch (error) {
            if(error) {
                return res.status(400).json({
                    message: "Failed to add Country!",
                    error
                })
            }
        }
    }

    async GetCountry(res:Response) {
        try {
            const data = await this.countryRepository.find();
            return res.status(200).json({data, message: "Successfully got all Country data!!", amount: data.length})
        } catch (error) {
            return res.status(400).json({error})
        }
    }

    async GetOneCountry(id:number, res:Response) {
        try {
            if(!id) {
                return res.status(400).json({
                    message: 'ID must be exist!'
                })
            }
            
            const getOne = await this.countryRepository.findOne({
                where: {
                    id
                }
            });
            return res.status(200).json({
                message: `Success get ${getOne.country_name} Country!`,
                data: getOne
            })
        } catch (error) {
            if(error) {
                return res.status(400).json({
                    error
                })
            }
        }
    }

    async UpdateCountry(id:number, country_name:string, res:Response) {
        try {
            if(!id) {
                return res.status(400).json({
                    message: 'ID must exist!'
                })
            }
            await this.countryRepository.update({id}, {country_name})
            return res.status(201).json({
                message: "Successfully updated Country"
            })
        } catch (error) {
            if(error) {
                return res.status(400).json({
                    message: "Failed updated Country!",
                    error
                })
            }
        }
    }

    async DeleteCountry(id:number, res:Response) {
        try {
            const result = await this.countryRepository.findOne({
                where: {
                    id
                }
            });
            await this.countryRepository.delete({id});
            return res.status(200).json({
                message: `Success to delete ${result.country_name} Country!`,
                status: 200
            });
        } catch (error) {
            return res.status(400).json({
                message: `Failed to delete Country!`,
                error,
                status: 400
            })
        }
    }
}
