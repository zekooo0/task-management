import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskCategory, TaskStatus } from './tasks.model';

import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  status: TaskStatus;

  @Prop({ required: true })
  category: TaskCategory;

  @Prop()
  dueDate: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
