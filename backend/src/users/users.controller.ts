import { Body, Controller, Post, Get, UseGuards, Request } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
@Controller('users') // /users
export class UsersController {
	constructor(private readonly usersService: UsersService){ }

	@Post()
	async create(@Body() createUserDto: CreateUserDto){
		const {username, password} = createUserDto;
		return this.usersService.create(username, password);
	}

	@Get()
	@UseGuards(JwtAuthGuard) // [X] fix 404
	async findAll() {
		return this.usersService.findAll();
	}
	
}