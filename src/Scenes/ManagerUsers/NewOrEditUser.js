import React from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import { saveUser, editUser } from "../../AsyncStorage/Storage";
import uuid from "react-native-uuid";

import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

import {
  PrimaryButton,
  PrimaryLabel,
  TextField,
  PickerButton
} from "../../Component/SelfComponents";

const styles = StyleSheet.create({
  headerContainer: {
    heigh: 200,
    backgroundColor: "#17B978"
  },
  image: {
    height: 400,
    width: "100%",
    resizeMode: "cover"
  },
  container: {
    padding: 20,
    marginTop: -200,
    backgroundColor: "white",
    justifyContent: "flex-end",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    shadowColor: "gray",
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 12
  },
  marginButton: {
    marginTop: 15,
    marginBottom: 10
  },
  marginLabel: {
    marginTop: 20,
    marginBottom: 20
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
  iconBack: {
    resizeMode: "cover",
    height: 23,
    width: 12
  },
  iconTouchable: {
    position: "absolute",
    height: 23,
    width: 12,
    left: 20,
    top: 40
  }
});

class NewOrUpdateUser extends React.Component {
  activities = () => {
    return ["Sedentário", "Leve", "Moderado", "Alto", "Intenso"];
  };

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.item?.id ?? "",
      name: this.props.route.params.item?.name ?? "",
      age: this.props.route.params.item?.age ?? "",
      weight: this.props.route.params.item?.weight ?? "",
      height: this.props.route.params.item?.height ?? "",
      activity: this.props.route.params.item?.activity ?? "",
      isLoading: false
    };
  }

  componentDidMount = () => {
    this.setState({ name: this.state.name });
    this.setState({ age: this.state.age });
    this.setState({ weight: this.state.weight });
    this.setState({ height: this.state.height });
    this.setState({ activity: this.state.activity });
  };

  onSelectedActivity = (item, index) => {
    this.setState({ activity: item });
  };

  back = () => {
    this.props.navigation.pop();
  };

  changeNameValue = (value) => {
    this.setState({ name: value });
  };

  changeAgeValue = (value) => {
    this.setState({ age: value });
  };

  changeWeightValue = (value) => {
    this.setState({ weight: value });
  };

  changeHeightValue = (value) => {
    this.setState({ height: value });
  };

  verifyFields = () => {
    if (
      this.state.name === "" ||
      this.state.age === "" ||
      this.state.weight === "" ||
      this.state.height === "" ||
      this.state.activit === ""
    ) {
      return false;
    }
    return true;
  };

  save = async () => {
    if (!this.verifyFields()) {
      this.allFieldsAreRequiredMessage();
      return;
    }
    this.setState({ isLoading: true });
    var user = {
      name: this.state.name,
      age: this.state.age,
      weight: this.state.weight,
      height: this.state.height,
      activity: this.state.activity
    };
    if (this.state.id !== "") {
      user.id = this.state.id;
      await editUser(user);
      this.successSaved("Usuário alterado com sucesso");
    } else {
      user.id = uuid.v4();
      await saveUser(user);
      this.successSaved("Usuário salvo com sucesso");
    }
  };

  successSaved = (message) => {
    this.setState({ isLoading: false });
    alert(message);
    this.back();
  };

  allFieldsAreRequiredMessage = () => {
    alert("Todos os campos são obrigatórios");
  };

  render() {
    return (
      <View>
        <View style={styles.headerContainer}>
          <Image
            style={styles.image}
            source={require("../../Assets/background.png")}
          />
          <TouchableOpacity style={styles.iconTouchable} onPress={this.back}>
            <Image
              style={styles.iconBack}
              source={require("../../Assets/icon_back_blue.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <PrimaryLabel
            style={styles.marginLabel}
            text="Informe dados do usuário"
          />
          <TextField
            tip="Nome"
            value={this.state.name}
            onChangeText={this.changeNameValue}
          />
          <TextField
            tip="Idade"
            value={this.state.age}
            onChangeText={this.changeAgeValue}
            keyboardType="number"
          />
          <TextField
            tip="Peso"
            value={this.state.weight}
            onChangeText={this.changeWeightValue}
            keyboardType="number"
          />
          <TextField
            tip="Altura"
            value={this.state.height}
            onChangeText={this.changeHeightValue}
            keyboardType="number"
          />
          <PickerButton
            tip="Frequência de Atividade"
            items={this.activities()}
            onSelected={this.onSelectedActivity}
            selected={this.state.activity}
          />
          {this.state.isLoading ? (
            <ActivityIndicator style={styles.marginButton} color="#17B978" />
          ) : (
            <PrimaryButton
              style={styles.marginButton}
              onPress={this.save}
              text="Salvar"
            />
          )}
        </View>
      </View>
    );
  }
}
export { NewOrUpdateUser };
