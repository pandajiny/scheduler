import { serverUrl } from "../App";
import { createAuthPostOption, getAuthHeader, getUser } from "./AuthModules";

export const getTodoItems = async (): Promise<TodoItem[] | []> => {
  console.log("get todoItems");
  const url = serverUrl + "todo";

  const headers = getAuthHeader();
  if (!headers) {
    return [];
  }

  const result = await fetch(url, {
    method: "GET",
    headers,
  });

  if (!result.ok) {
    return [];
  }

  const todoItems = ((await result.json()) as unknown) as TodoItem[];
  console.log(`${todoItems.length} todo items updated`);

  return todoItems;
};

export const addTodoItem = async (props: {
  content: string;
  parentId?: string;
  endTime: number | null;
}): Promise<ActionResult> => {
  const { content, endTime, parentId } = props;
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
    parentId: parentId || null,
    isComplete: false,
    owner: user.uid,
    endTime: endTime || null,
  };

  return await fetch(url, createAuthPostOption(request)).then(
    async (resp) => await resp.json()
  );
};

export const deleteTodoItem = async (request: { id: string }) => {
  const { id } = request;
  const url = serverUrl + `todo/${id}`;

  const headers = getAuthHeader();
  if (!headers) {
    throw "please login first";
  }

  const resp = await fetch(url, {
    method: "DELETE",
    headers,
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
