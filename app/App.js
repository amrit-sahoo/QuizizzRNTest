import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import _ from "lodash";

import Card from "./Card";

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: new Array(this.props.numberOfCards).fill(""),
      isAddButtonActive: true,
    };
    this.height = 0;
  }

  addCard = () => {
    this.setState({
      cards: [...this.state.cards, ""],
    });
  };

  componentDidUpdate(prvProps, prevState) {
    if (prevState.cards.length !== this.state.cards.length) {
      const numberofCards = prevState.cards.length;
      const cardsHeight = numberofCards * 44 + 16;
      console.log(cardsHeight, this.height - 62);
      if (cardsHeight >= this.height - (50 + 12)) {
        this.setState({
          isAddButtonActive: false,
        });
      }
    }
  }

  onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    this.height = height;
    console.log(height);
  };

  render() {
    return (
      <>
        <View onLayout={this.onLayout} style={styles.columnContent}>
          {this.state.cards.map((number, index) => (
            <Card num={index} />
          ))}
        </View>
        {this.state.isAddButtonActive ? (
          <TouchableOpacity onPress={this.addCard} style={styles.addBtn}>
            <Text style={styles.addBtnText}>Add</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.disabledAddBtn}>
            <Text style={styles.disabledBtnText}>Add</Text>
          </TouchableOpacity>
        )}
      </>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.column}>
            <Column numberOfCards={3} />
          </View>
          <View style={styles.column}>
            <Column numberOfCards={2} />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#f2f2f2",
    padding: 8,
    paddingTop: 20,
    flexDirection: "row",
  },

  column: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "#FFF",
    padding: 8,
    margin: 8,
  },
  columnContent: {
    flex: 1,
  },
  addBtn: {
    height: 50,
    backgroundColor: "#412243",
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  disabledAddBtn: {
    height: 50,
    backgroundColor: "grey",
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  disabledBtnText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 20,
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
