import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Product, ProductDocument } from './product.schema'

@Injectable()
export class ProductsService{
	constructor(
		@InjectModel(Product.name) private productModel: Model<ProductDocument>,
	){}

	// crear product asoc a uno o mas usuarios
	async create(productData: {
		name: string;
		desc: string;
		price: number;
		users?: string[]; // viene del fe
		user_id: string;  // user auth'd
	}): Promise<any> {
		const { name, desc, price, users = [], user_id: userId } = productData;

		// verificar si ya existe producto con ese nombre para el usuario auth
		const prodExists = await this.productModel.findOne({ name, users: userId });
		if (prodExists) throw new Error('Ya existe un producto con el mismo nombre para este user');

		// agregar el userId a la lista (sin duplicados)
		const userIdsSet = new Set<string>([...users, userId]);
		const userObjectIds = Array.from(userIdsSet).map((id) => new Types.ObjectId(id));

		const newProduct = new this.productModel({
			name,
			desc,
			price,
			users: userObjectIds,
		});

		const saved = await newProduct.save();
		const { _id, name: n, desc: d, price: p, createdAt } = saved.toObject();
		return { _id, name: n, desc: d, price: p, createdAt };
	}


	// Obtener productos del usuario autenticado
	async findByUser(user_id: string): Promise<any[]> {
  		const products = await this.productModel
    		.find({ users: user_id })
    		.populate('users', '_id username') 
    		.exec();

  		return products.map((p) => {
    		const { _id, name, desc, price, createdAt, users } = p.toObject(); 
    		return { _id, name, desc, price, createdAt, users }; 
  		});
}

	async deleteById(id: string, userId: string): Promise<{deleted: boolean}>{
	const res = await this.productModel.updateOne(
		{ _id: id },
		{ $pull: { users: userId } }
	);

	return { deleted: res.modifiedCount > 0 };
}

}