import { SchedulerService } from "../../app";
import { parseErrorResponse } from "../http";
export async function getTodos(filter: TodosFilter): Promise<Todo[]> {
  return await SchedulerService.get<Todo[]>(`/todos`, {
    params: filter,
  })
    .then((resp) => resp.data)
    .catch((err) => {
      throw parseErrorResponse(err).message;
    });
}

export async function getTodo(todoId: string): Promise<Todo> {
  return await SchedulerService.get<Todo>(`/todos/${todoId}`)
    .then((resp) => resp.data)
    .catch((err) => {
      throw parseErrorResponse(err).message;
    });
}

export const addTodo = async (request: AddTodoRequest) => {
  await SchedulerService.post("/todos", request).catch((err) => {
    throw parseErrorResponse(err).message;
  });
};

export async function deleteTodo(todoId: string) {
  await SchedulerService.delete(`/todos/${todoId}`).catch((err) => {
    throw parseErrorResponse(err).message;
  });
}

export async function updateTodo() {}
