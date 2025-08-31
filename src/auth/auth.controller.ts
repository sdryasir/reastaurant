import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { User } from './schemas/user.schema';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('register')
    @ApiOperation({summary:'This will Create new User'})
    @ApiResponse({status:201, description:'Create User in DB'})
    @ApiBody({type: SignupDto})
    createUser(@Body() body:SignupDto): Promise<User>{
        return this.authService.createUser(body)
    }

    @Post('login')
    @ApiOperation({summary:'This will Login the User'})
    @ApiResponse({status:201, description:'Login the user'})
    @ApiBody({type: LoginDto})
    login(@Body() body:LoginDto){
        return this.authService.login(body)
    }






}
