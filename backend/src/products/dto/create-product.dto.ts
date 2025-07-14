import { IsString, IsNotEmpty, IsNumber, Min, IsArray, IsMongoId, ArrayNotEmpty, } from 'class-validator';

export class CreateProductDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	desc: string;

	@IsNumber()
	@Min(0)
	price: number;

	// users seleccionados para dicho producto
	@IsArray()
	@ArrayNotEmpty()
	@IsMongoId({each: true})
	users: string[];
}
