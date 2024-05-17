import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TasksModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://zekooo0:PcctHExLCutSeDeY@cluster0.oydhl37.mongodb.net/tasks?retryWrites=true&w=majority&appName=Cluster0',
    ),
  ],
})
export class AppModule {}
