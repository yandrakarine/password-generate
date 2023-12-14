import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
  const getItems = async (key) => {
    try {
      const passwords = await AsyncStorage.getItem(key);
      return JSON.parse(passwords) || [];
    } catch (error) {
      console.log("Erro ao buscar", error);
      return [];
    }
  };

  const saveItem = async (key, value) => {
    try {
      let passwordsFromStorage = await getItems(key);
      passwordsFromStorage.push(value);
      await AsyncStorage.setItem(key, JSON.stringify(passwordsFromStorage));
    } catch (error) {
      console.log("Erro ao salvar", error);
    }
  };

  const removeItem = async (key, item) => {
    try {
      let passwordsFromStorage = await getItems(key);
      let passwordsWithoutOne = passwordsFromStorage.filter((password) => {
        return password != item;
      });

      await AsyncStorage.setItem(key, JSON.stringify(passwordsWithoutOne));
      return passwordsWithoutOne;
    } catch (error) {
      console.log("Erro ao deletar", error);
    }
  };

  return {
    getItems,
    saveItem,
    removeItem,
  };
};

export default useStorage;
