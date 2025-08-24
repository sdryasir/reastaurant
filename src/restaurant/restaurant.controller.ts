import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dtos/restaurant.dto';
import { Restaurant } from './schema/restaurant.schema';

//http://localhost:4000/restaurants
@Controller("restaurants")
export class RestaurantController {

    constructor(private restaurantService: RestaurantService){}

    @Post()
    createRestaurant(@Body() body:CreateRestaurantDto): Promise<Restaurant>{
        return this.restaurantService.createRestaurant(body);
    }

    @Get()
    getAllrestaurants(): Promise<Restaurant[]>{
        return this.restaurantService.getAllRestaurants();
    }

    @Get(':id')
    getRestaurantById(@Param("id") id:string): Promise<Restaurant>{
        return this.restaurantService.getRestaurantById(id);
    }

    @Delete()
    async deleteRestaurant(@Query('id') id:string){
        await this.restaurantService.getRestaurantById(id);
        return this.restaurantService.deleteRestaurant(id);
    }

    @Put(':id')
    async updateRestaurant(@Param('id') id:string, @Body() body:any ){
        await this.restaurantService.getRestaurantById(id);
        return this.restaurantService.updateRestaurant(id, body);
    }
}
