import { serverUrl } from "../App";
import { getAuthHeader, getUser, createAuthPostOption } from "./AuthModules";
import { doGetRequest } from "./HttpsModles";

export function getFilter(query: string): TodosFilter {
  const urlParams = new URLSearchParams(query);
  const userId = urlParams.get("user_id");
  if (!userId) {
    throw new Error("Cannot parse user id");
  }
  const filter: TodosFilter = {
    userId,
  };
  const groupId = urlParams.get("group_id");
  if (groupId) {
    filter.groupId = groupId;
  }
  return filter;
}

export async function getTodos(filter: TodosFilter): Promise<TodoItem[]> {
  let url = `${serverUrl}/todos?user_id=${filter.userId}`;
  if (filter.groupId) {
    url += `&group_id=${filter.groupId}`;
  }

  const todoItems = await doGetRequest<TodoItem[]>(url);
  return todoItems;
}

export const addTodoItem = async (props: {
  content: string;
  parentId: string | null;
  endTime: number | null;
  groupId: string | null;
}): Promise<ActionResult> => {
  const { content, endTime, parentId, groupId } = props;
  console.log("adding todo");
  const url = serverUrl + "/todo";
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

export async function getGroupsFromUser(userId: string): Promise<Group[]> {
  const url = `${serverUrl}/users/${userId}/groups`;
  const groups = await doGetRequest<Group[]>(url);
  return groups;
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
