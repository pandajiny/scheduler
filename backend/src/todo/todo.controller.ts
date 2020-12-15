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
  async addTodo(
    @Request() req,
    @Body() addRequest: AddTodoItemRequest,
  ): Promise<ActionResult> {
    const user = req.user as User;
    console.log(`adding todo witxh ${user.email}`, addRequest);

    const result = await this.todoService.createTodo(addRequest);
    console.log(`adding todo done : ${result.message}`);

    return {
      ok: true,
      message: 'testing api',
    };
  }

  @Delete('/:todoId')
  async deleteTodo(@Request() req, @Param() params): Promise<ActionResult> {
    const user = req.user as User;
    const id = params.todoId;
    console.log(`delete request from ${user.email} id : ${id}`);

    return await this.todoService.deleteTodoItem({ todoId: id }).catch(err => {
      return {
        ok: false,
        error_message: err.message,
      };
    });
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
