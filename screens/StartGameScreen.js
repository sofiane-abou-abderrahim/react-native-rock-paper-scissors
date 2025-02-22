import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";

import PrimaryButton from "../components/PrimaryButton";

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const DEFAULT_USER_CHOICE = ROCK;
const RESULT_DRAW = "DRAW";
const RESULT_PLAYER_WINS = "PLAYER_WINS";
const RESULT_COMPUTER_WINS = "COMPUTER_WINS";

function StartGameScreen() {
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const [enteredValue, setEnteredValue] = useState("");

  function startNewGameHandler() {
    if (gameIsRunning) {
      return;
    }
    setGameIsRunning(true);
    console.log("Game is starting...");
  }

  const getPlayerChoice = function () {
    let selection = enteredValue.toUpperCase();
    if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
      Alert.alert(`Invalid choice! We chose ${DEFAULT_USER_CHOICE} for you!`);
      selection = DEFAULT_USER_CHOICE;
    }
    console.log(`Player chose: ${selection}`);
    return selection;
  };

  const getComputerChoice = function () {
    let selection;
    const randomValue = Math.random();
    if (randomValue < 0.34) {
      selection = ROCK;
      console.log(`Computer chose: ${selection}`);
      return selection;
    } else if (randomValue < 0.67) {
      selection = PAPER;
      console.log(`Computer chose: ${selection}`);
      return selection;
    } else {
      selection = SCISSORS;
      console.log(`Computer chose: ${selection}`);
      return selection;
    }
  };

  const getWinner = function (cChoice, pChoice) {
    if (cChoice === pChoice) {
      return RESULT_DRAW;
    } else if (
      (cChoice === ROCK && pChoice === PAPER) ||
      (cChoice === PAPER && pChoice === SCISSORS) ||
      (cChoice === SCISSORS && pChoice === ROCK)
    ) {
      return RESULT_PLAYER_WINS;
    } else {
      return RESULT_COMPUTER_WINS;
    }
  };

  return (
    <View>
      {gameIsRunning ? (
        <View>
          <Text style={styles.text}>Enter Your Choice</Text>
          <TextInput
            style={styles.textInput}
            placeholder="ROCK, PAPER or SCISSORS?"
            onChangeText={(text) => setEnteredValue(text)}
            value={enteredValue}
            autoCorrect={false}
          />
          <PrimaryButton
            onPress={function () {
              const playerChoice = getPlayerChoice();
              const computerChoice = getComputerChoice();
              const winner = getWinner(computerChoice, playerChoice);
              console.log(`Result: ${winner}`);
            }}
          >
            Confirm
          </PrimaryButton>
        </View>
      ) : (
        <PrimaryButton color="#841584" onPress={startNewGameHandler}>
          Start Game
        </PrimaryButton>
      )}
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
  textInput: {
    height: 50,
    width: 200,
    fontSize: 14,
    borderBottomColor: "#72063c",
    borderBottomWidth: 2,
    color: "#72063c",
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
});
