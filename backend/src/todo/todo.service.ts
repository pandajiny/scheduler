import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { defaultCipherList } from 'constants';
import { DbService } from 'src/db/db.service';

@Injectable()
export class TodoService {
  constructor(private dbService: DbService) {}

  async addTodoItem(request: AddTodoItemRequest): Promise<ActionResult> {
    const id = this.dbService.getUniqueString();
    const { owner, content, isComplete, parentId, endTime } = request;

    const createTime = new Date().getTime();

    const query = `
      INSERT INTO TodoItems (id,owner, content, isComplete, parentId, createTime, endTime)
      VALUES(
        "${id}","${owner}", "${content}", ${isComplete},
        ${parentId ? `"${parentId}"` : `null`}, ${createTime}, ${endTime}
      )
    `;

    const writeResult = await this.dbService.doWriteQuery(query);

    console.log(`getting todo query done ${writeResult.message}`);

    return {
      ok: true,
      message: 'successfully added todoItem ' + content,
    };
  }

  async getTodosFromDb(uid: string): Promise<TodoItem[]> {
    const query = `SELECT * FROM TodoItems WHERE owner = "${uid}"`;
    const todoItems = await this.dbService.doGetQuery<TodoItem>(query);
    if (todoItems) {
      console.log(`got ${todoItems.length} of todos `);
      return todoItems;
    } else {
      console.log(`todo item're empty`);
      return [];
    }
  }

  async deleteTodoItem(request: {
    id: string;
    user: User;
  }): Promise<ActionResult> {
    const { id, user } = request;

    const selectChildQuery = `SELECT * FROM TodoItems WHERE parentId = "${id}" AND owner = "${user.uid}"`;
    const childTodoItems = await this.dbService.doGetQuery<TodoItem>(
      selectChildQuery,
    );

    if (childTodoItems) {
      childTodoItems.map(async childTodoItem => {
        const deleteResult = await this.deleteTodoItem({
          id: childTodoItem.id!,
          user: user,
        });
        if (!deleteResult.ok) {
          console.error(deleteResult);
        }
      });
    }

    const query = `DELETE FROM TodoItems WHERE id = "${id}" AND owner = "${user.uid}"`;
    await this.dbService.doWriteQuery(query).catch(error => {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    });

    console.log(`successfully deleted`);
    return {
      ok: true,
      message: 'Successfully deleted todo item',
    };
  }

  async editTodoItem(todo: TodoItem): Promise<ActionResult> {
    const query = `UPDATE TodoItems SET content = "${
      todo.content
    }" WHERE id = "${todo.id!}"`;
    await this.dbService.doWriteQuery(query).catch(err => {
      console.log(`error found during doing write query`);
      throw err;
    });

    return { ok: true, message: `todo id ${todo.id} has updated successfully` };
  }

  async completeTodoItems(ids: string[]): Promise<ActionResult> {
    const results = await Promise.all(
      ids.map(async id => {
        const query = `UPDATE TodoItems SET isComplete = true WHERE id = "${id}"`;
        const result = await this.dbService.doWriteQuery(query);
        console.log(`${id} is now completed`);
        return;
      }),
    );
    return {
      ok: true,
      message: `${results.length} is now completed`,
    };
  }

  async uncompleteTodoItems(ids: string[]): Promise<ActionResult> {
    const results = await Promise.all(
      ids.map(async id => {
        const query = `UPDATE TodoItems SET isComplete = false WHERE id = "${id}"`;
        const result = await this.dbService.doWriteQuery(query);
        console.log(`${id} is now uncompleted`);
        return;
      }),
    );
    return {
      ok: true,
      message: `${results.length} is now uncompleted`,
    };
  }
}
