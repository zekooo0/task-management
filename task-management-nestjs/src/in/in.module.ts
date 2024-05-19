import { In, InSchema } from './in.schema';
import { Module, forwardRef } from '@nestjs/common';
import { User, UserSchema } from 'src/auth/user.schema';

import { AuthModule } from 'src/auth/auth.module';
import { InController } from './in.controller';
import { InService } from './in.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: In.name, schema: InSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [InController],
  providers: [InService],
  exports: [InService],
})
export class InModule {}
