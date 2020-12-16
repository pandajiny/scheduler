import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  Delete,
  Param,
  HttpException,
  Put,
  HttpStatus,
  Query,
  RequestMethod,
} from '@nestjs/common';
import { timeStamp } from 'console';
import { ApiService } from 'src/api/api.service';
import { TodoService } from './todo.service';

// @UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodoController {
  constructor(
    private todoService: TodoService,
    private apiService: ApiService,
  ) {}

  @Get()
  async getTodos(@Request() req): Promise<HttpResponse<Todo[]>> {
    const { user_id, group_id } = req.query;

    const filter: TodosFilter = {
      userId: user_id,
      groupId: group_id,
    };

    const todoItems = await this.todoService.getTodos(filter).catch(err => {
      console.log(`cannot query todo`, err);
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    });
    console.log(`${todoItems.length} of todo Items have queried`);

    return this.apiService.httpResponse(todoItems);
  }

  @Get('/:todoId')
  async getTodo() {}

  @Post()
  async addTodo(@Request() req): Promise<HttpResponse<ActionResult>> {
    const request: AddTodoRequest = req.body;
    console.log(`adding todo / content  : ${request.content}`);

    const result = await this.todoService.createTodo(request).catch(err => {
      console.error(err);
      throw new HttpException(`${err}`, HttpStatus.FORBIDDEN);
    });
    console.log(`adding todo done : ${result.message}`);

    return this.apiService.httpResponse(result);
  }

  @Delete('/:todoId')
  async deleteTodo(@Request() req): Promise<HttpResponse<ActionResult>> {
    const { todoId } = req.params;
    console.log(`delete todo requestid / todoId : ${todoId}`);

    const result = await this.todoService.deleteTodo({ todoId }).catch(err => {
      console.error(err);
      throw new HttpException(`${err}`, HttpStatus.FORBIDDEN);
    });

    return this.apiService.httpResponse(result);
  }

  @Put(`/:todoId`)
  async updateTodo(@Body() todo: Todo): Promise<ActionResult> {
    console.log(`-----update todo requested ${todo.todo_id}-----`);

    const result = await this.todoService.updateTodo(todo);
    if (!result.ok) {
      throw new HttpException(
        `err : ${result.error_message}`,
        HttpStatus.FORBIDDEN,
      );
    }

    return result;
  }
}
