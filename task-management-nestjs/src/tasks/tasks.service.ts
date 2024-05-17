import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.model';

import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { category, search, status } = filterDto;
    const query = {};

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

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, category, dueDate } = createTaskDto;

    const task = {
      title,
      description,
      category,
      dueDate,
      status: TaskStatus.OPEN,
    };

    const newTask = await this.taskModel.create(task);
    return newTask;
  }

  async deleteTask(id: string): Promise<void> {
    const check = await this.taskModel.findByIdAndDelete(id);
    if (!check) {
      throw new NotFoundException();
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.taskModel.findByIdAndUpdate(id, { status });
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }
}
