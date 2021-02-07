import axios from "axios";
import { parseErrorResponse } from "../http";
export async function getTodos(filter: TodosFilter): Promise<Todo[]> {
  return await axios
    .get<Todo[]>(`/scheduler/todos`, { params: filter })
    .then((resp) => resp.data)
    .catch((err) => {
      throw parseErrorResponse(err).message;
    });
}

export async function getTodo(todoId: string): Promise<Todo> {
  return await axios
    .get<Todo>(`/scheduler/todos/${todoId}`)
    .then((resp) => resp.data)
    .catch((err) => {
      throw parseErrorResponse(err).message;
    });
}

export const addTodo = async (request: AddTodoRequest) => {
  await axios.post("/scheduler/todos", request).catch((err) => {
    throw parseErrorResponse(err).message;
  });
};

export async function deleteTodo(todoId: string) {
  await axios.delete(`/scheduler/todos/${todoId}`).catch((err) => {
    throw parseErrorResponse(err).message;
  });
}

export async function updateTodo() {}
