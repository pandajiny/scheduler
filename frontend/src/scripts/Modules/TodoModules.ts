import { serverUrl } from "../App";
import { getAuthHeader, createAuthPostOption, getUser } from "./AuthModules";

export const getTodoItems = async (): Promise<TodoItem[] | []> => {
  console.log("get todoItems");
  const url = serverUrl + "todo";
  console.log(`header`, getAuthHeader());
  const result = await fetch(url, {
    method: "GET",
    headers: getAuthHeader(),
  }).catch((err) => {
    console.log(`error catched`);
    throw err;
  });
  console.log(result.ok);
  if (!result.ok) {
    return [];
  }
  const data = ((await result.json()) as unknown) as TodoItem[];
  console.log("todoItems :", data);
  return data;
};

export const addTodoItem = async (
  content: string,
  parentId?: string
): Promise<ActionResult> => {
  console.log("adding todo");
  const url = serverUrl + "todo";
  const user = await getUser();
  if (!user) {
    throw new Error("please login first");
  }
  console.log(user);
  if (!user.uid) {
    throw new Error("cannot get user's uid");
  }

  const request: AddTodoItemRequest = {
    content,
    parentId,
    isComplete: false,
    owner: user.uid,
  };

  return await fetch(url, createAuthPostOption(request)).then(
    async (resp) => await resp.json()
  );
};

export const deleteTodoItem = async (request: { id: string }) => {
  const { id } = request;
  const url = serverUrl + `todo/${id}`;

  const resp = await fetch(url, {
    headers: getAuthHeader(),
    method: "DELETE",
  });
  const result = await resp.json();

  console.log(`delete result`, result);
  return result as ActionResult;
};

export async function editTodo(todo: TodoItem): Promise<ActionResult> {
  const url = serverUrl + `todo/${todo.id}`;

  const headers = Object.assign(
    { "Content-Type": "application/json" },
    getAuthHeader()
  );

  console.log(headers);
  const resp = await fetch(url, {
    headers,
    method: "PUT",
    body: JSON.stringify(todo),
  });

  if (!resp.ok) {
    return {
      ok: false,
      error_message: await resp.json().then((r) => r.message),
    };
  }

  const result = await resp.json();
  console.log(`edit todo result`, result);

  return result;
}

export async function completeTodos(ids: string[]): Promise<ActionResult> {
  const url = serverUrl + `todo/complete`;

  const headers = Object.assign(
    { "Content-Type": "application/json" },
    getAuthHeader()
  );

  const resp = await fetch(url, {
    headers,
    method: "POST",
    body: JSON.stringify(ids),
  });

  if (!resp.ok) {
    throw new Error(await resp.json());
  }

  const result = await resp.json();
  console.log(`complete todos result`, result);

  return result;
}

export async function uncompleteTodos(ids: string[]): Promise<ActionResult> {
  const url = serverUrl + `todo/uncomplete`;

  const headers = Object.assign(
    { "Content-Type": "application/json" },
    getAuthHeader()
  );

  const resp = await fetch(url, {
    headers,
    method: "POST",
    body: JSON.stringify(ids),
  });

  if (!resp.ok) {
    throw new Error(await resp.json());
  }

  const result = await resp.json();
  console.log(`uncomplete todos result`, result);

  return result;
}
