import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { ITask, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  constructor() {}

  get getAllTasks(): ITask[] {
    return this.tasks;
  }

  getTaskByID(id: string): ITask {
    return this.tasks.find(task => task.id === id);
  }

  deleteTaskByID(id: string): ITask | undefined {
    const _existIdx = this.tasks.findIndex(task => task.id === id);
    if (_existIdx > -1) {
      const _removeItem = this.tasks.splice(_existIdx, 1);
      return _removeItem[0];
    } else {
      return undefined;
    }
  }

  createNewTask(createTaskDTO: CreateTaskDTO): ITask {
    const { title, description } = createTaskDTO;
    const _task: ITask = {
      id: this.genID(),
      title: title || 'Ăn ở',
      description: description || 'Ăn chín ở sạch',
      status: TaskStatus.TO_DO,
    };
    this.tasks.push(_task);
    return _task;
  }

  genID(): string {
    let _id = Math.random() * 9999;
    if (_id.toString().indexOf('.') > -1) {
      _id = +_id.toString().replace('.', '');
    }
    while (this.tasks.find((task) => +task.id === _id)) {
      _id = Math.random() * 9999;
      if (_id.toString().indexOf('.') > -1) {
        _id = +_id.toString().replace('.', '');
      }
    }
    return _id.toString();
  }
}
