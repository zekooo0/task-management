import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { User } from 'src/auth/user.schema';

export type InDocument = HydratedDocument<In>;

@Schema()
export class In {
  @Prop()
  url: string;

  @Prop()
  photo: string;

  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  address: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const InSchema = SchemaFactory.createForClass(In);
