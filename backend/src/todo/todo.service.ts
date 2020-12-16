import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ApiService } from 'src/api/api.service';
import {
  getInsertTodoQuery,
  getDeleteTodoQuery,
  getUpdateTodoQuery,
  DB_TABLES,
  DB_NAMES,
  getSelectTodoQuery,
} from 'src/db/query';

@Injectable()
export class TodoService {
  constructor(private dbService: DbService, private apiService: ApiService) {}

  async getTodos(filter: TodosFilter): Promise<Todo[]> {
    const { userId, groupId } = filter;

    const todoItems = await this.dbService.doGetQuery<Todo>(
      getSelectTodoQuery({ userId, groupId }),
      DB_NAMES.SCHEDULER_DB,
    );

    console.log(`got ${todoItems.length} of todos `);
    return todoItems;
  }

  async getTodo(todoId: string): Promise<Todo> {
    const query = `SELECT * from todos WHERE todo_id = "${todoId}"`;
    const todo = await this.dbService.doGetQuery<Todo>(query, 'scheduler_db');
    if (todo.length == 1) {
      return todo[0];
    } else {
      throw new Error(`cannot get todoItem ${todo[0]}`);
    }
  }

  async createTodo(request: AddTodoRequest): Promise<ActionResult> {
    const query = getInsertTodoQuery({
      request,
    });

    const writeResult = await this.dbService.doWriteQuery(
      query,
      'scheduler_db',
    );

    return {
      ok: true,
      message: 'adding todo item done',
    };
  }

  async deleteTodo(request: { todoId: string }): Promise<ActionResult> {
    const { todoId } = request;

    const childTodoItems = await this.dbService.doGetQuery<Todo>(
      getSelectTodoQuery({
        parentId: todoId,
      }),
      'scheduler_db',
    );

    if (childTodoItems.length > 0) {
      childTodoItems.map(async childTodoItem => {
        const deleteResult = await this.deleteTodo({
          todoId: childTodoItem.todo_id!,
        });
        if (!deleteResult.ok) {
          console.error(deleteResult);
        }
      });
    }

    const query = getDeleteTodoQuery({ todo_id: todoId });
    await this.dbService.doWriteQuery(query, 'scheduler_db').catch(error => {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    });

    return {
      ok: true,
      message: 'Successfully deleted todo item',
    };
  }

  async updateTodo(todo: Todo): Promise<ActionResult> {
    const query = getUpdateTodoQuery({ todo });

    const result = await this.dbService.doWriteQuery(query, 'scheduler_db');
    return result;
  }
}
