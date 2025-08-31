import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { SignupDto } from './dtos/signup.dto';
import bcrypt from "bcryptjs";
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {

    constructor(@InjectModel(User.name) private userModel:Model<User>){}


    async createUser(body: SignupDto): Promise<User>{
        try {
            const {name, email, password} = body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await this.userModel.create({name, email, password: hashedPassword});
            return user;
        } catch (error) {
            if(error?.code == 11000 || error?.cause?.code ===11000 || error?.message?.include('E11000')){
                throw new ConflictException("Duplicate Email");
            }
            throw error;
        }
    }


    async login(body: LoginDto){
        const {email, password} = body;
        try {
            const user = await this.userModel.findOne({email});
            if(!user){
                throw new UnauthorizedException('Invalid Email or Password')
            }

            const isPasswordMatched = await bcrypt.compare(password, user.password);

            if(!isPasswordMatched){
                throw new UnauthorizedException('The password you enetered in not correct');
            }


            //Sign a JWT token and return it to the user

            return user;


        } catch (error) {
            throw new UnauthorizedException(error)
        }
    }
}
