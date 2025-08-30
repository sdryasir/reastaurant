import { TestingModule, Test } from "@nestjs/testing";
import { RestaurantService } from "./restaurant.service";
import { getModelToken } from "@nestjs/mongoose";
import { NotFoundException } from "@nestjs/common";

let mockRestaurants =  [
  {
    "_id": "68ab0455fdcf8d70e4b32133",
    "name": "John Doe Updated",
    "cuisine": [
      "Pakistani",
      "Indian"
    ],
    "rating": 4,
    "reviewsCount": 10,
    "priceRange": "$",
    "contact": {
      "phone": "+92 xxx xxxxxxx",
      "email": "example@example.com",
      "_id": "68b2edc191dddb275c3a1ed3"
    },
    "address": {
      "street": "123 Food Street",
      "city": "Lahore",
      "state": "Punjab",
      "country": "Pakistan",
      "postalCode": "54000",
      "_id": "68ab0455fdcf8d70e4b32135"
    },
    "location": {
      "lat": 31.582045,
      "lng": 74.329376,
      "_id": "68ab0455fdcf8d70e4b32136"
    },
    "isOpen": true,
  },
  {
    "_id": "68b2e314ead2f130719ae018",
    "name": "John Doe",
    "cuisine": [
      "Pakistani",
      "Indian"
    ],
    "rating": 4,
    "reviewsCount": 10,
    "priceRange": "$",
    "contact": {
      "phone": "+92 xxx xxxxxxx",
      "email": "example@example.com",
      "_id": "68b2e314ead2f130719ae019"
    },
    "address": {
      "street": "address",
      "city": "city",
      "state": "state",
      "country": "country",
      "postalCode": "4111",
      "_id": "68b2e314ead2f130719ae01a"
    },
    "location": {
      "lat": 25.325256,
      "lng": 47.32564,
      "_id": "68b2e314ead2f130719ae01b"
    },
    "isOpen": true,
  },
  {
    "_id": "68b2e341ead2f130719ae01d",
    "name": "John Doe",
    "cuisine": [
      "Pakistani",
      "Indian"
    ],
    "rating": 4,
    "reviewsCount": 10,
    "priceRange": "$",
    "contact": {
      "phone": "+92 xxx xxxxxxx",
      "email": "example@example.com",
      "_id": "68b2e341ead2f130719ae01e"
    },
    "address": {
      "street": "address",
      "city": "city",
      "state": "state",
      "country": "country",
      "postalCode": "4111",
      "_id": "68b2e341ead2f130719ae01f"
    },
    "location": {
      "lat": 25.325256,
      "lng": 47.32564,
      "_id": "68b2e314ead2f130719ae01b"
    },
    "isOpen": true,
  }
]

describe("RestaurantService", ()=>{
    let service: RestaurantService;
    let model: any;

    beforeEach(async ()=>{
        const module: TestingModule = await Test.createTestingModule({
            providers:[
                RestaurantService,
                {
                    provide:getModelToken('Restaurant'),
                    useValue:{
                        create: jest.fn(),
                        find: jest.fn(),
                        findById: jest.fn(),
                        findByIdAndDelete: jest.fn(),
                        findByIdAndUpdate: jest.fn(),
                    }
                }
            ]
        }).compile();

       service =  module.get(RestaurantService);
       model = module.get(getModelToken('Restaurant'));
    })


    it("should exist", ()=>{
        expect(service).toBeDefined();
    })


    describe("Create Restaurant", ()=>{
        it('should create and return the restaurants', async ()=>{
            model.create.mockResolvedValue(mockRestaurants[0]);

            const results = await service.createRestaurant(mockRestaurants[0]);
            expect(results).toEqual(mockRestaurants[0]);
        })
    })

    describe("GetAllRestaurants", ()=>{
        it('should return all the restaurants', async ()=>{
            model.find.mockResolvedValue(mockRestaurants);
            const results = await service.getAllRestaurants();
            expect(results).toEqual(mockRestaurants);
        })
    })


    describe("GetRestaurantById", ()=>{
        it('should return restaurant by id', async ()=>{
            model.findById.mockResolvedValue(mockRestaurants[0]);

            const restaurant = await service.getRestaurantById('68ab0455fdcf8d70e4b32133');
            expect(restaurant).toEqual(mockRestaurants[0]);
        })

        it('should return not found exception', async ()=>{
            model.findById.mockResolvedValue(null);
            await expect(service.getRestaurantById('1')).rejects.toThrow(NotFoundException);
        })
    })


    describe("deleteRestaurant", ()=>{
        it('should delete restaurant', async ()=>{
            model.findByIdAndDelete.mockResolvedValue(mockRestaurants[0]);

            const restaurant = await service.deleteRestaurant('68ab0455fdcf8d70e4b32133');
            expect(restaurant).toEqual(mockRestaurants[0]);
        })
    })


    describe("updateRestaurant", ()=>{
        it('should update restaurant', async ()=>{
            model.findByIdAndUpdate.mockResolvedValue(mockRestaurants[0]);

            const restaurant = await service.updateRestaurant('68ab0455fdcf8d70e4b32133', {"name": "New Restaurant"});
            expect(restaurant).toEqual(mockRestaurants[0]);
        })
    })

})