import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { airport_city } from 'src/Model/airport_city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(airport_city)
        private cityRepository:Repository<airport_city>,
    ){}

    async AddCity(city_name:string, res:Response) {
        try {
            if(!city_name) {
                return res.status(400).json({
                    message: 'You cannot enter empty city data!',
                    
                })
            } 


            const duplicate = await this.cityRepository.findOne({
                where: {
                    city_name
                }
            });
            if(duplicate) {
                return res.status(400).json({
                    message: `${duplicate.city_name} is already exists!`
                })
            }
            const result = await this.cityRepository.save({
                city_name
            });
            return res.status(201).json({
                message: "Success to add City!",
                result,
                status: 201
            })
        } catch (error) {
            if(error) {
                return res.status(400).json({
                    message: "Failed to add City!",
                    error
                })
            }
        }
    }

    async GetCity(res:Response) {
        try {
            const data = await this.cityRepository.find();
            return res.status(200).json({data, message: "Successfully got all City data!!", amount: data.length})
        } catch (error) {
            return res.status(400).json({error})
        }
    }

    async GetOneCity(id:number, res:Response) {
        try {
            if(!id) {
                return res.status(400).json({
                    message: 'ID must be exist!'
                })
            }
            
            const getOne = await this.cityRepository.findOne({
                where: {
                    id
                }
            });
            return res.status(200).json({
                message: `Successfully get ${getOne.city_name} City!`,
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

    async UpdateCity(id:number, city_name:string, res:Response) {
        try {
            if(!id) {
                return res.status(400).json({
                    message: 'ID must be exist!'
                })
            }
            await this.cityRepository.update({id}, {city_name})
            return res.status(201).json({
                message: "Successfully updated City!"
            })
        } catch (error) {
            if(error) {
                return res.status(400).json({
                    message: "Failed updated City!",
                    error
                })
            }
        }
    }
    async DeleteCity(id:number, res:Response) {
        try {
            const result = await this.cityRepository.findOne({
                where: {
                    id
                }
            })
            await this.cityRepository.delete({id})
            return res.status(200).json({
                message: `Success to delete ${result.city_name} City!`,
                status: 200
            })
        } catch (error) {
            return res.status(400).json({
                message: `Failed to delete City!`,
                status: 400
            })
        }
    }
}
