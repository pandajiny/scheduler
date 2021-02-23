import { addItems, dbInstance, getItems } from ".";

const storeGroups = async () => {
  const db = await dbInstance();
  return db.transaction("groups", "readwrite").objectStore("groups");
};
export function createGroupStore(db: IDBDatabase) {
  const store = db.createObjectStore("groups", { keyPath: "group_id" });
  store.createIndex("group_name", "group_name");
  store.createIndex("owner_id", "owner_id");
  store.createIndex("create_time", "create_time");
  store.createIndex("item_count", "item_count");
}

type GroupChangeListener = (groups: GroupDTO[]) => any;

const listeners: GroupChangeListener[] = [];

function excuteChangeListeners() {
  getGroups().then((groups) => {
    listeners.map(async (listener) => {
      listener(groups);
    });
  });
}

export function addGroupChangeListener(listener: GroupChangeListener) {
  listeners.push(listener);
}

export async function updateGroups(groups: GroupDTO[]) {
  const store = await storeGroups();
  store.clear();
  await addItems<GroupDTO>(groups, store).then(excuteChangeListeners);
}
export async function getGroups(): Promise<GroupDTO[]> {
  const store = await storeGroups();
  return await getItems<GroupDTO>(store);
}
