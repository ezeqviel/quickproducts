import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './user.schema'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
  	){}

  	// crear user
	async create(createUserDto: CreateUserDto): Promise<User>{
    	const createdUser = new this.userModel(createUserDto)
    	return createdUser.save()
  	}

	// buscar por username
	async findByUsername(username: string): Promise <User | null>{
		return this.userModel.findOne({username}).exec()
  	}

  	// todos
	async findAll(): Promise <User[]>{
    	return this.userModel.find().exec()
  	}
}
