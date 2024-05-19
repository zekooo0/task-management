import { AuthModule } from './auth/auth.module';
import { InModule } from './in/in.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://zekooo0:PcctHExLCutSeDeY@cluster0.oydhl37.mongodb.net/tasks?retryWrites=true&w=majority&appName=Cluster0',
    ),
    AuthModule,
    InModule,
    TasksModule,
  ],
})
export class AppModule {}
