import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

//http://localhost:4000/restaurants
@Controller("restaurants")
export class RestaurantController {

    constructor(private restaurantService: RestaurantService){}

    @Post()
    createRestaurant(@Body() body:any){
        return this.restaurantService.createRestaurant(body);
    }

    @Get()
    getAllrestaurants(){
        return this.restaurantService.getAllRestaurants();
    }

    @Get(':id/:name/:m')
    getRestaurantById(@Param() params: {id:string, name:string, m:string}){
        return params;
    }

    @Delete()
    deleteRestaurant(@Query('id') id:string){
        return `Delete ${id}`;
    }

    @Put(':id')
    updaterestaurant(@Param() id:string){
        return `Update ${id}`
    }
}
