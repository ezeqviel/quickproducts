import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './jwt.strategy'
import { JwtAuthGuard } from './jwt-auth.guard'

@Module({
	imports: [
    	UsersModule,
    	JwtModule.register({
      		secret: 'secreto123', // deberia estar en una env variable
      		signOptions: { expiresIn: '1h' },
    	}),
  	],
  	providers: [AuthService, JwtStrategy, JwtAuthGuard],
  	controllers: [AuthController],
	exports: [AuthService, JwtAuthGuard], // fixed! aprobado por postman
})
export class AuthModule {}