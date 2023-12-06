import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Response } from 'express';
import { aircraft } from 'src/Model/aircraft.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class AirplaneService {
    constructor(
        @InjectRepository(aircraft)
        private airplaneRepository:Repository<aircraft>,
    ){}

    async AddAirplane(airplane_code:string, airplane_name: string, seat_ammount:number, res:Response) {
        try {
            
            const newAirplane = new aircraft;
            newAirplane.aircraft_name = airplane_name;
            newAirplane.aircraft_code = airplane_code;
            newAirplane.seat_ammount = seat_ammount;
            
            const errors = await validate(newAirplane);
            if(errors.length > 0) {
                const errorMessages = errors.map(error => {
                    const property = error.property; // Nama properti yang sedang divalidasi
                    const constraints = error.constraints.isNotEmpty // Pesan-pesan kesalahan
                    
                    return { property, message : constraints };
                  });
                  return res.status(400).json({ errors: errorMessages});
            }
            if(airplane_code || airplane_name) {

                const duplicate = await this.airplaneRepository.findOne({
                    where: [
                        {
                            aircraft_name: airplane_name,
                        },
                        {
                            
                            aircraft_code: airplane_code
                        }
                    ]
                });
                if(duplicate) {
                    if(duplicate.aircraft_name === airplane_name && duplicate.aircraft_code === airplane_code){
                        return res.status(400).json({
                            message: `${duplicate.aircraft_name} and ${duplicate.aircraft_code} is already exists!`
                        })
                    } else if(duplicate.aircraft_name === airplane_name) {
                        return res.status(400).json({
                            message: `${duplicate.aircraft_name} is already exists!`
                        })
                    } else if(duplicate.aircraft_code === airplane_code) {
                        return res.status(400).json({
                            message: `${duplicate.aircraft_code} is already exists!`
                        })
                    }
                }
            }
            const seatString = seat_ammount.toString();
            if(seatString.includes("-")) {
                return res.status(400).json({
                    message: 'Cannot fill in negative number!',
                    
                })
            } 
            const result = await this.airplaneRepository.save({
                aircraft_code: airplane_code,
                aircraft_name: airplane_name,
                seat_ammount
            });
            return res.status(201).json({
                message: "Success to add Airplane!",
                result,
                status: 201
            })
        } catch (error) {
            if(error) {
                return res.status(400).json({
                    message: "Failed to add Airplane!",
                    error
                })
            }
        }
    }
    async GetAirplane(res:Response) {
        try {
            const data = await this.airplaneRepository.find();
            return res.status(200).json({data, message: "Successfully got all Airplane data!", amount: data.length})
        } catch (error) {
            return res.status(400).json({error})
        }
    }

    async GetOneAirplane(id:number, res:Response) {
        try {
            if(!id) {
                return res.status(400).json({
                    message: 'ID must be exist!'
                })
            }
            
            const getOne = await this.airplaneRepository.findOne({
                where: {
                    id
                }
            });
            if(!getOne) {
                return res.status(404).json({
                    message: "Airplane data not found!"
                })
            }
            return res.status(200).json({
                message: `Successfully get ${getOne.aircraft_name} Airplane!`,
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
    async UpdateAirplane(id:number, airplane_name:string, airplane_code:string, seat_ammount:number, res:Response) {
        

        try {
            const newAirplane = new aircraft;
            newAirplane.aircraft_name = airplane_name;
            newAirplane.aircraft_code = airplane_code;
            newAirplane.seat_ammount = seat_ammount;
            
            const errors = await validate(newAirplane);
            if(errors.length > 0) {
                const errorMessages = errors.map(error => {
                    const property = error.property; 
                    const constraints = error.constraints.isNotEmpty 
                    
                    return { property, message : constraints };
                  });
                  return res.status(400).json({ errors: errorMessages});
            }
            if(airplane_code || airplane_name) {

                
                const duplicate = await this.airplaneRepository.createQueryBuilder('aircraft')
                .where('aircraft.aircraft_name = :airplane_name', {airplane_name})
                .andWhere('aircraft.id != :id', {id})
                .orWhere('aircraft.aircraft_code = :airplane_code', {airplane_code})
                .andWhere('aircraft.id != :id', {id})
                .getOne();
                if(duplicate) {
                    if(duplicate.aircraft_name === airplane_name && duplicate.aircraft_code === airplane_code){
                        return res.status(400).json({
                            message: `${duplicate.aircraft_name} and ${duplicate.aircraft_code} is already exists!`,
                            duplicate
                        })
                    } else if(duplicate.aircraft_name === airplane_name) {
                        return res.status(400).json({
                            message: `${duplicate.aircraft_name} is already exists!`,
                            duplicate
                        })
                    } else if(duplicate.aircraft_code === airplane_code) {
                        return res.status(400).json({
                            message: `${duplicate.aircraft_code} is already exists!`
                        })
                    }
                }
            }
            const seatString = seat_ammount.toString();
            if(seatString.includes("-")) {
                return res.status(400).json({
                    message: 'Cannot fill in negative number!',
                    
                })
            } 
            await this.airplaneRepository.update({id}, {aircraft_name: airplane_name});
            return res.status(201).json({
                message: "Successfully updated Airplane!"
            })
        } catch (error) {
            if(error) {
                return res.status(400).json({
                    message: "Failed updated Airplane!",
                    error
                })
            }
        }
    }

    async DeleteAirplane(id:number, res:Response) {
        try {
            const result = await this.airplaneRepository.findOne({
                where: {
                    id
                }
            })
            await this.airplaneRepository.delete({id})
            return res.status(200).json({
                message: `Success to delete ${result.aircraft_name}!`,
                status: 200
            })
        } catch (error) {
            return res.status(400).json({
                message: `Failed to delete Airplane!`,
                status: 400
            })
        }
    }
}
