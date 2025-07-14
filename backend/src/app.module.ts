import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersController } from './users/users.controller'
import { UsersService } from './users/users.service'
import { User, UserSchema } from './users/user.schema'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/qpdb', {
      dbName: 'qpdb', // QuickProducts database
    }),

    MongooseModule.forFeature([{name: User.name, schema: UserSchema }])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})

export class AppModule {} // convención de nestjs