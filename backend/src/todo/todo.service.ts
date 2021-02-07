import { BadRequestException, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { DbService } from 'src/db/db.service';
import {
  insertTodoQuery,
  deleteTodoQuery,
  updateTodoQuery,
  selectTodoQuery,
} from 'src/db/query';

@Injectable()
export class TodoService {
  constructor(private dbService: DbService) {}
  async getTodos(filter: TodosFilter): Promise<Todo[]> {
    const { userId, groupId } = filter;
    return await this.dbService.get<Todo>(selectTodoQuery({ userId, groupId }));
  }

  async getTodo(todoId: string): Promise<Todo> {
    const query = `SELECT * from todos WHERE todo_id = "${todoId}"`;
    const todo = await this.dbService.get<Todo>(query);
    if (todo.length == 1) {
      return todo[0];
    } else {
      throw new BadRequestException(`Cannot get todo`);
    }
  }

  async createTodo(request: AddTodoRequest) {
    await this.dbService.write(insertTodoQuery({ request })).catch(err => {
      console.error(err);
      throw new BadRequestException(`Cannot save todo`);
    });
  }

  async deleteTodo(todoId: string, uid: string) {
    // not implement yet : child todo

    // const childTodoItems = await this.dbService.get<Todo>(
    //   selectTodoQuery({
    //     parentId: todoId,
    //   }),
    // );

    // if (childTodoItems.length > 0) {
    //   await Promise.all(
    //     childTodoItems.map(async todo => {
    //       const deleteResult = await this.deleteTodo(todo.todo_id);
    //     }),
    //   );
    // }
    const todo = await this.getTodo(todoId).catch(err => {
      console.error(err);
      throw new BadRequestException(`Cannot find todo`);
    });

    if (todo.owner_user_id != uid) {
      throw new UnauthorizedException(`Access denied`);
    }

    await this.dbService.write(deleteTodoQuery({ todo_id: todoId }));
  }

  async updateTodo(todo: Todo): Promise<void> {
    const query = updateTodoQuery({ todo });
    await this.dbService.write(query);
    return;
  }
}
