import { addItems, dbInstance, getItems } from ".";

const storeTodos = async () => {
  const db = await dbInstance();
  return db.transaction("todos", "readwrite").objectStore("todos");
};

export function createTodoStore(db: IDBDatabase) {
  const store = db.createObjectStore("todos", { keyPath: "todo_id" });
  store.createIndex("owner_user_id", "owner_user_id");
  store.createIndex("content", "content");
  store.createIndex("create_datetime", "create_datetime");
  store.createIndex("complete_datetime", "complete_datetime");
  store.createIndex("limit_datetime", "limit_datetime");
  store.createIndex("parent_todo_id", "parent_todo_id");
  store.createIndex("group_id", "group_id");
}

type TodoChangeListener = (todos: Todo[]) => any;

const listeners: TodoChangeListener[] = [];

export function addTodoChangeListener(listener: TodoChangeListener) {
  listeners.push(listener);
}

function excuteChangeListeners() {
  getTodos().then((todos) => {
    listeners.map(async (listener) => {
      listener(todos);
    });
  });
}

export async function updateTodos(todos: Todo[]) {
  const store = await storeTodos();
  store.clear();
  await addItems<Todo>(todos, store).then(excuteChangeListeners);
}

export async function getTodos(): Promise<Todo[]> {
  const store = await storeTodos();
  const todos = await getItems<Todo>(store);
  return todos.sort(
    (prev, next) => (prev.limit_datetime || 0) - (next.limit_datetime || 0)
  );
}

export const TodoStore = {
  get: getTodos,
  onUpdate: addTodoChangeListener,
};
