import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant } from './schema/restaurant.schema';

@Injectable()
export class RestaurantService {

    constructor(@InjectModel('Restaurant') private restaurantModel: Model<Restaurant>) {}

    private restaurants:any[] = []

    async createRestaurant(data:Restaurant): Promise<Restaurant>{
        const res = await this.restaurantModel.create(data);
        return res;
    }


    async getAllRestaurants(): Promise<Restaurant[]>{
        return await this.restaurantModel.find({});
    }


    async getRestaurantById(id:string): Promise<Restaurant>{
        const restaurant = await this.restaurantModel.findById(id);
        if(!restaurant){
            throw new NotFoundException('Restaurant not found')
        }
        return restaurant;
    }


    async deleteRestaurant(id:string):Promise<Restaurant | null>{
        return await this.restaurantModel.findByIdAndDelete(id);
    }


    async updateRestaurant(id: string, data:any): Promise<Restaurant | null>{
        return await this.restaurantModel.findByIdAndUpdate(id, data);
    }
}
