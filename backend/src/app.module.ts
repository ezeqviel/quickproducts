import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { ProductsModule } from './products/products.module'
import { UsersModule } from './users/users.module' 

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/qpdb', {
      dbName: 'qpdb', // QuickProducts database
    }),
    UsersModule,
    AuthModule,
    ProductsModule
  ],
})

export class AppModule {} // convención de nestjs