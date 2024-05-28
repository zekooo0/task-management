import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskCategory, TaskStatus } from './tasks.model';
import mongoose, { HydratedDocument } from 'mongoose';

import { User } from 'src/auth/user.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  status: TaskStatus;

  @Prop()
  category: TaskCategory;

  @Prop()
  dueDate: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
