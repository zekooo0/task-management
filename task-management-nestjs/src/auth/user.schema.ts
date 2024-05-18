import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { Task } from 'src/tasks/task.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  linkedinUrl: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Task' })
  tasks: Task[];
}

export const UserSchema = SchemaFactory.createForClass(User);
