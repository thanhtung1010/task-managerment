import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { ITask } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

  constructor(private tasksSer: TasksService) {}

  @Get() getAllTasks(): ITask[] {
    return this.tasksSer.getAllTasks;
  }

  @Post() add(@Body() createTaskDTO: CreateTaskDTO): ITask {
    return this.tasksSer.createNewTask(createTaskDTO);
  }

  @Post('/read/:id') getTaskByID(@Param('id') id: string): ITask {
    return this.tasksSer.getTaskByID(id);
  }

  @Post('/delete/:id') deleteTaskByID(@Param('id') id: string): ITask {
    return this.tasksSer.deleteTaskByID(id);
  }
}
