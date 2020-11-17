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
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TodoService } from './todo.service';

@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  async getTodos(@Request() req): Promise<TodoItem[]> {
    const user = req.user as User;
    console.log(`get todo with ${user.email}`);
    const todoItems = await this.todoService
      .getTodosFromDb(user.uid)
      .catch(err => {
        console.log(`cannot query todo`, err);
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
    console.log(`${todoItems.length} of todo Items have queried`);

    return todoItems;
  }

  @Post()
  async addTodo(
    @Request() req,
    @Body() addRequest: AddTodoItemRequest,
  ): Promise<ActionResult> {
    const user = req.user as User;
    console.log(`adding todo with ${user.email}`, addRequest);

    const result = await this.todoService.addTodoItem(addRequest);
    console.log(`adding todo done : ${result.message}`);

    return {
      ok: true,
      message: 'testing api',
    };
  }

  @Delete(':id')
  async deleteTodo(@Request() req, @Param() params): Promise<ActionResult> {
    const user = req.user as User;
    const id = params.id;
    console.log(`delete request from ${user.email} id : ${id}`);

    return await this.todoService.deleteTodoItem({ id, user }).catch(err => {
      return {
        ok: false,
        error_message: err.message,
      };
    });
  }

  @Put(`:id`)
  async editTodo(@Body() todo: TodoItem): Promise<ActionResult> {
    console.log(`-----update todo requested ${todo.id}-----`);
    return await this.todoService.editTodoItem(todo).catch(err => {
      console.log(`fucked`);

      return {
        ok: false,
        error_message: err.message,
      };
    });
  }

  @Post(`complete`)
  async setCompleteTodos(@Body() ids: string[]): Promise<ActionResult> {
    console.log(`----- complete ${ids.length} todos requeted -----`);
    return this.todoService.completeTodoItems(ids).catch(err => {
      return {
        ok: false,
        error_message: err,
      };
    });
  }

  @Post(`uncomplete`)
  async setUncompleteTodos(@Body() ids: string[]): Promise<ActionResult> {
    console.log(`----- uncomplete ${ids.length} todos requeted -----`);
    return this.todoService.uncompleteTodoItems(ids).catch(err => {
      return {
        ok: false,
        error_message: err,
      };
    });
  }
}
