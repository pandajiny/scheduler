import { serverUrl } from "../App";
import { createAuthPostOption, getAuthHeader, getUser } from "./AuthModules";

export function testReq() {
  const url = serverUrl + `group`;
  const headers = getAuthHeader();
  if (headers) {
    fetch(url, { headers });
  }
}

export const getTodoItemsFromLoggedInUser = async (): Promise<TodoItem[]> => {
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
  endTime?: number;
  groupId?: string;
}): Promise<ActionResult> => {
  const { content, endTime, parentId, groupId } = props;
  console.log("adding todo");
  const url = serverUrl + "todo";
  const user = await getUser();

  if (!user) {
    throw new Error("please login first");
  }

  const request: AddTodoItemRequest = {
    content,
    parentId: parentId || null,
    isComplete: false,
    owner: user.uid,
    endTime: endTime || null,
    groupId: groupId || null,
  };

  const result = await fetch(url, createAuthPostOption(request)).then(
    async (resp) => await resp.json()
  );
  console.log(`adding todo done`, result);

  return {
    ok: true,
    message: "adding todo done",
  };
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

export function getEndTimeListFromTodos(
  todoItems: TodoItem[]
): Array<number | null> {
  return [...new Set(todoItems.map((todoItem) => todoItem.end_time))];
}

export async function getGroupList(): Promise<Group[]> {
  const url = serverUrl + `group`;
  const headers = getAuthHeader();
  if (!headers) {
    throw new Error(`please login first`);
  }
  const response = await fetch(url, { headers });
  const result = (await response.json()) as Group[];
  console.log(`getting ${result.length} of group list done`);

  return result;
}

export async function addGroup(props: {
  groupName: string;
}): Promise<ActionResult> {
  const { groupName } = props;
  console.log(`add group with : ${groupName}`);
  const url = serverUrl + `group`;
  const headers = Object.assign(POST_HEADERS, getAuthHeader());
  const request: AddGroupRequest = {
    groupName,
  };
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(request),
  });

  const result = (await response.json()) as ActionResult;
  console.log(`add group done, ${result.message}`);
  return result;
}

const POST_HEADERS = {
  "Content-Type": "application/json",
};
