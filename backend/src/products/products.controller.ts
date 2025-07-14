import { Controller, Post, Get, Body, UseGuards, Request, Delete,Param } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	// endp protegido para crear el producto
	@UseGuards(JwtAuthGuard)
	@Post()
	@UseGuards(JwtAuthGuard)
	async create(@Body() body: CreateProductDto, @Request() req: any){ // [X] agregar dto
		const userId = req.user.userId
		return this.productsService.create({ ...body, user_id: userId })
	}

	// endpoint protegido para listar productos del usuario auth'd
	@UseGuards(JwtAuthGuard)
	@Get()
	async findByUser(@Request() req: any) {
		const userId = req.user.userId
		return this.productsService.findByUser(userId)
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id') id: string, @Request() req: any) {
		const userId = req.user.userId;
		return this.productsService.deleteById(id, userId);
	}

}