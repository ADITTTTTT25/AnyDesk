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
  FlatList,
} from "react-native";
import { ListItem } from "react-native-elements";
import MyHeader from "../components/MyHeader";
import db from "../config";
import firebase from "firebase";
export default class BookDonateScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      requestedBooksList: [],
    };
    this.requestRef = null;
  }

  getRequestedBooksList = async() => {
    this.requestRef = await db
      .collection("requested_books")
      .onSnapshot((snapshot) => {
        console.log("Snapshot: " + snapshot.docs);

        var requestedDbBookslist = snapshot.docs.map((doc) => doc.data());
        console.log("variable requestedBookslist" + requestedDbBookslist)
        this.setState({
          requestedBooksList: requestedDbBookslist,
        });
      });
    console.log("Response from database: " + this.state.requestedBooksList);
  };

  renderItem = ({ item, i }) => {
    console.log("renderItem executed:" + item);
    return (
      <ListItem
        key={i}
        title={item.book_name}
        subtitle={item.reason_to_request}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        rightElement={
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: "#ffff" }}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };
  componentWillUnmount() {
    this.requestRef();
  }
  componentDidMount() {
    this.getRequestedBooksList();
  }
  keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View>
        <MyHeader title="Donate Books" />
        <View style={{ flex: 1 }}>
          {this.state.requestedBooksList.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>List of all requested books</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.requestedBooksList}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
});
