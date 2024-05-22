import { IsEnum, IsString } from 'class-validator';
import { TaskCategory, TaskStatus } from '../tasks.model';

export class UpdateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(TaskCategory)
  category: TaskCategory;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsString()
  dueDate: string;
}
