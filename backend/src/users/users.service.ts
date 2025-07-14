import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './user.schema'
import { CreateUserDto } from './dto/create-user.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
  	){}

  	// crear user
	async create(username: string, password: string): Promise<Partial<User>>{
		const hashedPass = await bcrypt.hash(password, 10);
		const newUser = new this.userModel({username, password: hashedPass});
		const savedUser = await newUser.save(); // lo guardo en mongodb

		const userObj = savedUser.toObject() as any;
		delete userObj.password;

		return userObj;
	}

	// buscar por username
	async findByUsername(username: string): Promise <UserDocument | null>{
		return this.userModel.findOne({username}).exec()
  	}

  	// todos
	async findAll(): Promise <User[]>{
    	return this.userModel.find().exec()
  	}
}
