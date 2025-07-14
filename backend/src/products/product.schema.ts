import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Types } from 'mongoose'

export type ProductDocument = Product & Document;

/*
Product:
 - name
 - desc
 - price
 - users (ref a usuarios)
 - createdAt
*/

@Schema()
export class Product {
	@Prop({required: true})
	name: string;

	@Prop({required: true})
	desc: string;

	@Prop({required: true})
	price: number;

	@Prop({type: [{type: Types.ObjectId, ref: 'User'}]})
	users: Types.ObjectId[];

	@Prop({default: Date.now})
	createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.set('timestamps', true); // agrego timestamps

