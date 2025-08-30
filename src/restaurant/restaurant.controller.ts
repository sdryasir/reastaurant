import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dtos/restaurant.dto';
import { Restaurant } from './schema/restaurant.schema';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';

//http://localhost:4000/restaurants
@Controller("restaurants")
export class RestaurantController {

    constructor(private restaurantService: RestaurantService){}

    @Post()
    @ApiOperation({summary:'This will Create new restaurant'})
    @ApiResponse({status:201, description:'Create Restaurant in DB'})
    @ApiBody({type: CreateRestaurantDto})
    createRestaurant(@Body() body:CreateRestaurantDto): Promise<Restaurant>{
        return this.restaurantService.createRestaurant(body);
    }

    @Get()
    @ApiOperation({summary:'This will get list of all restaurants'})
    @ApiResponse({status:200, description:'get list of all restaurants'})
    getAllrestaurants(): Promise<Restaurant[]>{
        return this.restaurantService.getAllRestaurants();
    }

    @Get(':id')
    @ApiOperation({summary:'This will get single restaurant'})
    @ApiResponse({status:200, description:'This will get single restaurant'})
    @ApiParam({
        name:'id',
        type:String,
        description:'The ID of the restaurant'
    })
    getRestaurantById(@Param("id") id:string): Promise<Restaurant>{
        return this.restaurantService.getRestaurantById(id);
    }

    @Delete()
    @ApiOperation({summary:'This will delete restaurant by ID'})
    @ApiResponse({status:200, description:'This will delete restaurant by ID'})
    @ApiQuery({
        name:'id',
        required:true,
    })
    async deleteRestaurant(@Query('id') id:string){
        await this.restaurantService.getRestaurantById(id);
        return this.restaurantService.deleteRestaurant(id);
    }

    @Put(':id')
    @ApiOperation({summary:'This will Update the restaurant'})
    @ApiResponse({status:200, description:'This will Update the restaurant'})
    @ApiParam({
        name:'id',
        type:String,
        description:'The ID of the restaurant'
    })
    @ApiBody({type: UpdateRestaurantDto})
    async updateRestaurant(@Param('id') id:string, @Body() body:any ){
        await this.restaurantService.getRestaurantById(id);
        return this.restaurantService.updateRestaurant(id, body);
    }
}
