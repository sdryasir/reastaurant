import { Injectable } from '@nestjs/common';

@Injectable()
export class RestaurantService {


    private restaurants:any[] = []

    createRestaurant(data:any){
        return this.restaurants.push(data);
    }


    getAllRestaurants(){
        return this.restaurants;
    }
}
