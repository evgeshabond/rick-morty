import localforage from 'localforage';

export const getAll = async user => {
  try {
    const favoritesList = await localforage.getItem(user);
    if (!favoritesList) return [];
    return favoritesList;
  } catch (e) {
    return [];
  }
};

export const toggleItem = async (itemId, user) => {
  try {
    const favoritesList = await getAll(user);
    if (!favoritesList) {
      await localforage.setItem(user, [itemId]);
      return [itemId];
    }
    if (favoritesList.includes(itemId)) {
      const newList = favoritesList.filter(item => item !== itemId);
      await localforage.setItem(user, newList);
      return newList;
    }
    const newList = [...favoritesList, itemId];
    await localforage.setItem(user, newList);
    return newList;
  } catch (e) {
    return e;
  }
};
