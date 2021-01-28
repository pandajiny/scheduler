import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import {
  insertTodoQuery,
  deleteTodoQuery,
  updateTodoQuery,
  DB_NAMES,
  selectTodoQuery,
} from 'src/db/query';

@Injectable()
export class TodoService {
  constructor(private dbService: DbService) {}
  async getTodos(filter: TodosFilter): Promise<Todo[]> {
    const { userId, groupId } = filter;

    const todoItems = await this.dbService.get<Todo>(
      selectTodoQuery({ userId, groupId }),
      DB_NAMES.SCHEDULER_DB,
    );

    console.log(`got ${todoItems.length} of todos `);
    return todoItems;
  }

  async getTodo(todoId: string): Promise<Todo> {
    const query = `SELECT * from todos WHERE todo_id = "${todoId}"`;
    const todo = await this.dbService.get<Todo>(query, 'scheduler_db');
    if (todo.length == 1) {
      return todo[0];
    } else {
      throw new Error(`cannot get todoItem ${todo[0]}`);
    }
  }

  async createTodo(request: AddTodoRequest): Promise<ActionResult> {
    const query = insertTodoQuery({
      request,
    });

    const writeResult = await this.dbService.write(query, 'scheduler_db');

    return {
      ok: true,
      message: 'adding todo item done',
    };
  }

  async deleteTodo(request: { todoId: string }): Promise<ActionResult> {
    const { todoId } = request;

    const childTodoItems = await this.dbService.get<Todo>(
      selectTodoQuery({
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

    const query = deleteTodoQuery({ todo_id: todoId });
    await this.dbService.write(query, 'scheduler_db').catch(error => {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    });

    return {
      ok: true,
      message: 'Successfully deleted todo item',
    };
  }

  async updateTodo(todo: Todo): Promise<ActionResult> {
    const query = updateTodoQuery({ todo });

    const result = await this.dbService.write(query, 'scheduler_db');
    return result;
  }
}
