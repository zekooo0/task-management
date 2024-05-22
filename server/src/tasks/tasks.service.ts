import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.model';

import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from 'src/auth/user.schema';
import { UpdateTaskDto } from './dto/update-tasks-status.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { category, search, status } = filterDto;
    const query = { user };

    if (category) {
      query['category'] = category;
    }
    if (search) {
      query['$or'] = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    if (status) {
      query['status'] = status;
    }
    const tasks = await this.taskModel.find(query);
    return tasks;
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.taskModel.findOne({ _id: id, user });
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<{ status: string }> {
    const { title, description, category, dueDate } = createTaskDto;

    const task = {
      title,
      description,
      category,
      dueDate,
      status: TaskStatus.OPEN,
      user,
    };

    await this.taskModel.create(task);
    return { status: 'success' };
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const check = await this.taskModel.findOneAndDelete({ _id: id, user });
    if (!check) {
      throw new NotFoundException();
    }
  }

  async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    const task = await this.taskModel.findOneAndUpdate(
      { _id: id, user },
      updateTaskDto,
    );
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }
}
