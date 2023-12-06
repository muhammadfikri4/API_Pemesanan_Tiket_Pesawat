import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { User, verificationStatus } from '../Model/user.entity';
import { validate } from 'class-validator'
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { airport_aircraft } from '../Model/airport_aircraft.entity';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>, private mailerService:MailerService,
  ) {}
  async authRegist(authRegist:{name: string, email: string, phone_number: string, password: string}, res:Response): Promise<{message:string} | {errors: any} | Response> {
    try {
      const {name, email, phone_number, password} = authRegist;
      const phone = `+62${phone_number}`;
      const newUser = new User();
      newUser.name = name;
      newUser.email = email;
      newUser.phone_number = phone_number;
      newUser.password = password;
      
   
      
      
      const errors = await validate(newUser);
      if(errors.length > 0) {
       
        const errorMessages = errors.map(error => {
          const property = error.property; // Nama properti yang sedang divalidasi
          const constraints = error.constraints.isNotEmpty? {isNotEmpty: error.constraints.isNotEmpty} : error.constraints // Pesan-pesan kesalahan
          
          return { property, constraints };
        });
        let match:any;
        if(phone_number || email) {
          const findData = await this.usersRepository.findOne({
            where: [
              {
                phone_number: phone
              },
              {
                email
              }
            ]
          });
          if(findData) {
            match = {
              property: "Match",
              message: "Phone Number or Email already exists!"
            }
          }
        }
      return res.status(400).json({ message: "Error Registration!", errors: errorMessages, match, status: HttpStatus.BAD_REQUEST});
      } 
      
      
      newUser.phone_number = phone;
      const hashPassword = await bcrypt.hash(password, 10);
      newUser.password = hashPassword;

      const random = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    
      
      newUser.otp_code = random;
      this.mailerService.sendMail({
        to: email,
        from: 'muhtravelofc@gmail.com',
        subject: 'Muh Travel OTP Code Verification',
        text: `Your OTP Code Verification is ${random}`,
        html: `<p>Your OTP Code Verification is ${random}</p>`
      });

    
      const data = await this.usersRepository.save(newUser);
      return res.status(201).json({message: "Registration Successfully!", data})
    } catch (error) {
        
        return res.json({message: "Registration Failed!", errors: error})
    }
  }

  async verifAcc (verif:{otp_code:number, email:string}, res:Response):Promise<Response> {
   try {
    const acc = await this.usersRepository.findOne({
      where: {
        email: verif.email
      }
    });

   if(acc.otp_code !== verif.otp_code) {
      return res.status(403).json({message: "Your verification OTP Code is Wrong"})
    }

    const updt = await this.usersRepository.update({email: verif.email}, {
      status_verification: verificationStatus.verified
    })
    return res.status(201).json({message: "You have successfully verified the Account"});
  }
    catch (error) {
    return res.json({error})
    
   }
}

}
