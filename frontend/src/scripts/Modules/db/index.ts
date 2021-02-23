import {
  getGroups,
  updateGroups,
  createGroupStore,
  addGroupChangeListener,
} from "./group";
import {
  createTodoStore,
  updateTodos,
  getTodos,
  addTodoChangeListener,
} from "./todo";

export const dbInstance = async (): Promise<IDBDatabase> => {
  return new Promise((res) => {
    const idbRequest = window.indexedDB.open("db");
    idbRequest.onsuccess = () => {
      res(idbRequest.result);
    };
    idbRequest.onupgradeneeded = () => {
      console.log(`upgrade db`);
      createGroupStore(idbRequest.result);
      createTodoStore(idbRequest.result);
    };
    idbRequest.onerror = () => {
      throw `Cannot get instance of IDB`;
    };
  });
};

export async function addItems<T>(items: T[], store: IDBObjectStore) {
  await Promise.all(
    items.map(async (item) => {
      const request = store.add(item);
      return new Promise((res) => {
        request.onsuccess = () => {
          res(null);
        };
        request.onerror = (ev) => {
          throw `Cannot add items`;
        };
      });
    })
  );
}

export async function getItems<T>(store: IDBObjectStore): Promise<T[]> {
  const request = store.getAll();
  return new Promise((res) => {
    request.onsuccess = () => {
      res(request.result);
    };
  });
}

export const dbService = {
  updateGroups,
  getGroups,
  addGroupChangeListener,
  updateTodos,
  getTodos,
  addTodoChangeListener,
};
