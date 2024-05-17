import { IsEnum, IsNotEmpty } from 'class-validator';

import { TaskCategory } from '../tasks.model';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsEnum(TaskCategory)
  category: TaskCategory;

  @IsNotEmpty()
  dueDate: string;
}
