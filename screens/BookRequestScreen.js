import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import MyHeader from "../components/MyHeader";
import db from "../config";
import firebase from "firebase";
export default class BookRequestScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      bookName: "",
      reasonToRequest: "",
    };
  }
  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addRequest = async (bookName, reasonToRequest) => {
    console.log("function called properly");
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();
    console.log(randomRequestId);
    await db.collection("requested_books").add({
      "user_id": userId,
      "book_name": bookName,
      "reason_to_request": reasonToRequest,
      "request_id": randomRequestId,
    });
    this.setState({
      bookName: "",
      reasonToRequest: "",
    });
    return Alert.alert("Book Requested Successfully");
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Request Books" />
        <KeyboardAvoidingView style={styles.keyBoardStyle}>
          <TextInput
            style={styles.formTextInput}
            placeholder={"Enter Book Name..."}
            onChangeText={(text) => {
              this.setState({
                bookName: text,
              });
            }}
            value={this.state.bookName}
          />
          <TextInput
            style={[styles.formTextInput, { height: 300 }]}
            placeholder={"Why Do You Need The Book?"}
            multiline={true}
            numberOfLines={8}
            onChangeText={(text) => {
              this.setState({
                reasonToRequest: text,
              });
            }}
            value={this.state.reasonToRequest}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.addRequest(this.state.bookName, this.state.reasonToRequest);
            }}
          >
            <Text>Request</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  keyBoardStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#ffab91",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: "75%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
});
