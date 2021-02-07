import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Query,
  Session,
  UseGuards,
  UnauthorizedException,
  Param,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { TodoService } from './todo.service';

@UseGuards(AuthGuard)
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  async getTodos(@Query() query, @Session() session): Promise<Todo[]> {
    const uid = session.uid as string;
    const { user_id, group_id } = query;

    console.log(
      `get todos request / user : ${user_id || uid}, group : ${group_id ||
        'not selected'}`,
    );

    const filter: TodosFilter = {
      userId: user_id || uid,
      groupId: group_id,
    };

    return await this.todoService.getTodos(filter);
  }

  @Post()
  async addTodo(@Body() request: AddTodoRequest) {
    console.log(`add todo request : ${request.content}`);
    await this.todoService.createTodo(request);
  }

  @Delete('/:todoId')
  async deleteTodo(@Session() session, @Param() params) {
    const { todoId } = params;
    const uid = session.uid as string;
    console.log(`delete todo request / todo :  ${todoId}, from : ${uid}`);
    await this.todoService.deleteTodo(todoId, uid);
  }

  @Put(`/:todoId`)
  async updateTodo(@Session() session, @Body() todo: Todo) {
    console.log(`update todo request : ${todo.todo_id}`);
    if (todo.owner_user_id != session.uid) {
      throw new UnauthorizedException(`Access denied`);
    }
    await this.todoService.updateTodo(todo);
  }
}
