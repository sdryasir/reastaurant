import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';

export type RestaurantDocument = HydratedDocument<User>;


@Schema()
export class User {

    @Prop()
    name:string

    @Prop({unique:[true, 'This email already exists']})
    email: string

    @Prop()
    password:string

    @Prop({
        enum:['user', 'admin'],
        default:'user'
    })
    role:string

}

export const UserSchema = SchemaFactory.createForClass(User);
