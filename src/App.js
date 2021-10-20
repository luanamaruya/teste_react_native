import React from "react";
import { StyleSheet, View } from "react-native";
import ListAll from "./Scenes/ManagerUsers/ListAll";
import { NewOrUpdateUser } from "./Scenes/ManagerUsers/NewOrEditUser";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function App() {
  const Stack = createStackNavigator();

  const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  });

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="ListAll" component={ListAll} />
          <Stack.Screen name="NewOrUpdateUser" component={NewOrUpdateUser} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default App;
