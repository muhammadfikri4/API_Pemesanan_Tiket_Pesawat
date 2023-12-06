import { Module } from '@nestjs/common';
import { RegisterController } from './register/register.controller';
import { RegisterService } from './register/register.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './Model/user.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { aircraft } from './Model/aircraft.entity';
import { airport } from './Model/airport.entity';
import { airport_city } from './Model/airport_city.entity';
import { airport_aircraft } from './Model/airport_aircraft.entity';
import {JwtModule, JwtModuleOptions} from '@nestjs/jwt'
import { AirportController } from './airport/airport.controller';
import { AirportService } from './airport/airport.service';
import { airport_country } from './Model/airport_country.entity';
import { CityController } from './city/city.controller';
import { CityService } from './city/city.service';
import { CountryController } from './country/country.controller';
import { CountryService } from './country/country.service';
import { AirplaneController } from './airplane/airplane.controller';
import { AirplaneService } from './airplane/airplane.service';

@Module({
  imports: [
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async(configService:ConfigService):Promise<TypeOrmModuleOptions> => ({
       
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: Number(configService.get<string>('DB_PORT')),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DATABASE'),
          entities: [User, aircraft, airport, airport_city, airport_aircraft, airport_country],
          synchronize: true,
        }),
       
      
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([User, aircraft, airport, airport_city, airport_aircraft, airport_country]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp-relay.brevo.com',
        auth: {
          user: 'muhtravelofc@gmail.com',
          pass: 'w0MSAvpWbaBtsLOm'

        }
      }
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async(configService:ConfigService):Promise<JwtModuleOptions> => ({
        global: true,
        secret: configService.get<string>('ACCESS_TOKEN'),
        signOptions: {expiresIn: configService.get<string>('expires')}
      }),
      inject: [ConfigService]
    }),
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true
    }),
  ],
  controllers: [RegisterController, LoginController, AirportController, CityController, CountryController, AirplaneController],
  providers: [RegisterService, LoginService, AirportService, CityService, CountryService, AirplaneService],
})
export class AppModule {}
