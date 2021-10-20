import AsyncStorage from "@react-native-async-storage/async-storage";

async function saveUser(user) {
  var users = await getAll();
  users.push(user);
  try {
    await AsyncStorage.setItem("users", JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

async function editUser(user) {
  var users = await getAll();
  users = users.filter((e) => e.id !== user.id);
  users.push(user);
  try {
    await AsyncStorage.setItem("users", JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

async function removeUser(id) {
  var users = await getAll();
  users = users.filter((e) => e.id !== id);
  try {
    await AsyncStorage.setItem("users", JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

async function getAll() {
  try {
    const users = await AsyncStorage.getItem("users");
    if (users !== null) {
      return JSON.parse(users);
    }
    return [];
  } catch (error) {
    return [];
  }
}

export { saveUser, editUser, getAll, removeUser };
