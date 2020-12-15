import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ApiService } from 'src/api/api.service';

@Injectable()
export class TodoService {
  constructor(private dbService: DbService, private apiService: ApiService) {}

  async getTodos(filter: TodosFilter): Promise<Todo[]> {
    const { userId, groupId } = filter;

    let query = `SELECT * FROM todos WHERE owner_user_id = "${userId}"`;
    if (groupId) {
      query += `and group_id = "${groupId}"`;
    }

    const todoItems = await this.dbService.doGetQuery<Todo>(
      query,
      'scheduler_db',
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

  async createTodo(request: AddTodoItemRequest): Promise<ActionResult> {
    const id = this.dbService.getUniqueString();
    const { owner, content, isComplete, parentId, endTime, groupId } = request;

    const createTime = new Date().getTime();

    const query = `
      INSERT INTO todos (id,owner, content, isComplete, parentId, createTime, end_time, group_id)
      VALUES(
        "${id}","${owner}", "${content}", ${isComplete},
        ${parentId ? `"${parentId}"` : `null`},
        ${createTime}, ${endTime}, "${groupId}"
      )
    `;

    const writeResult = await this.dbService.doWriteQuery(
      query,
      'scheduler_db',
    );

    console.log(`getting todo query done ${writeResult.message}`);

    return {
      ok: true,
      message: 'successfully added todoItem ' + content,
    };
  }

  async updateTodo(todo: Todo): Promise<ActionResult> {
    const {
      todo_id,
      content,
      create_datetime,
      limit_datetime,
      group_id,
      complete_datetime,
      parent_todo_id,
      owner_user_id,
    } = todo;

    const query = `
      UPDATE todos SET
    
      content = "${content}", create_datetime=${create_datetime},
      limit_datetime= ${limit_datetime}, group_id="${group_id}",
      complete_datetime=${complete_datetime}, parent_todo_id = "${parent_todo_id}",
      owner_user_id="${owner_user_id}"

      WHERE todo_id = "${todo_id}"`;

    const result = await this.dbService.doWriteQuery(query, 'scheduler_db');
    return result;
  }

  async deleteTodoItem(request: { todoId: string }): Promise<ActionResult> {
    const { todoId } = request;

    const selectChildQuery = `SELECT * FROM todos WHERE parentId = "${todoId}"`;
    const childTodoItems = await this.dbService.doGetQuery<Todo>(
      selectChildQuery,
      'scheduler_db',
    );

    if (childTodoItems) {
      childTodoItems.map(async childTodoItem => {
        const deleteResult = await this.deleteTodoItem({
          todoId: childTodoItem.todo_id!,
        });
        if (!deleteResult.ok) {
          console.error(deleteResult);
        }
      });
    }

    const query = `
      DELETE FROM todos
      WHERE
      id = "${todoId}";`;
    await this.dbService.doWriteQuery(query, 'scheduler_db').catch(error => {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    });

    return {
      ok: true,
      message: 'Successfully deleted todo item',
    };
  }
}
