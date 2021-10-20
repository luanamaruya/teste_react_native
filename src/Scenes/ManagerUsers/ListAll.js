import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { getAll, removeUser } from "../../AsyncStorage/Storage";

import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import {
  PrimaryButton,
  SecondaryLabel,
  PrimaryGreenLabel,
  PrimaryLabel
} from "../../Component/SelfComponents";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white"
  },
  marginButton: {
    marginTop: 15,
    marginBottom: 10
  },
  shadowContainer: {
    padding: 10,
    justifyContent: "flex-end",
    borderRadius: 8,
    shadowColor: "gray",
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 12
  },
  item: {
    paddingRight: 10,
    paddingLeft: 10,
    height: 40
  },
  itemsText: {
    marginBottom: -25,
    height: 30
  },
  itemsIcons: {
    alignSelf: "flex-end",
    flexDirection: "row"
  },
  image: {
    marginLeft: 10,
    height: 15,
    width: 15
  },
  containerEmpty: {
    textAlign: "center",
    padding: 20
  }
});

class ListAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoading: true,
      isEmpty: false
    };
  }

  fetchAllUsers = async () => {
    this.setState({ isLoading: true });
    const items = await getAll();
    this.setState({ isLoading: false });
    this.setState({ isEmpty: items.length === 0 });
    this.setState({ items: items });
  };

  componentDidMount = async () => {
    await this.fetchAllUsers();
    this.props.navigation.addListener("focus", async () => {
      await this.fetchAllUsers();
    });
  };

  askToRemoveUser = (item) => {
    const success = window.confirm(
      "Confirma a remoção do usuário " + item.name + "?"
    );
    if (success) {
      this.removeUser(item);
    }
  };

  removeUser = async (item) => {
    this.setState({ isLoading: true });
    await removeUser(item.id);
    this.fetchAllUsers();
  };

  newUser = () => {
    this.editUser(null);
  };

  editUser = (item) => {
    this.props.navigation.navigate("NewOrUpdateUser", {
      item: item
    });
  };

  render() {
    return (
      <View>
        <View style={styles.container}>
          <PrimaryGreenLabel text="Gerenciamento de Dados" />
          <PrimaryButton
            style={styles.marginButton}
            onPress={this.newUser}
            text="Cadastrar usuário"
          />
          <View style={styles.shadowContainer}>
            {this.state.isEmpty === true && (
              <PrimaryLabel
                style={styles.containerEmpty}
                text="Nenhum usuário cadastrado até o momento"
              />
            )}
            {this.state.isLoading ? (
              <ActivityIndicator color="#17B978" />
            ) : (
              <FlatList
                data={this.state.items}
                renderItem={({ item }) => (
                  <View>
                    <View style={styles.item}>
                      <SecondaryLabel
                        text={item.name}
                        style={styles.itemsText}
                      />
                      <View style={styles.itemsIcons}>
                        <TouchableOpacity onPress={(e) => this.editUser(item)}>
                          <View>
                            <Image
                              style={styles.image}
                              source={require("../../Assets/icon-pen.png")}
                            />
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => this.askToRemoveUser(item)}
                        >
                          <View>
                            <Image
                              style={styles.image}
                              source={require("../../Assets/trash-empty.png")}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

export default ListAll;
