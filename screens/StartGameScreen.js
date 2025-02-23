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
    setEnteredValue("");
    console.log("Game is starting...");
  }

  const getPlayerChoice = () => {
    let selection = enteredValue.toUpperCase().trim();
    if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
      Alert.alert(
        "Invalid choice!",
        `We chose ${DEFAULT_USER_CHOICE} for you!`,
        [
          { text: "OK", onPress: () => playGame(DEFAULT_USER_CHOICE) }, // ✅ Play continues after the alert
        ]
      );
      return null; // ❌ Nothing is returned here, the game will continue via onPress
    }
    return selection;
  };

  const getComputerChoice = () => {
    const randomValue = Math.random();
    if (randomValue < 0.34) {
      return ROCK;
    } else if (randomValue < 0.67) {
      return PAPER;
    } else {
      return SCISSORS;
    }
  };

  const getWinner = (cChoice, pChoice) =>
    cChoice === pChoice
      ? RESULT_DRAW
      : (cChoice === ROCK && pChoice === PAPER) ||
        (cChoice === PAPER && pChoice === SCISSORS) ||
        (cChoice === SCISSORS && pChoice === ROCK)
      ? RESULT_PLAYER_WINS
      : RESULT_COMPUTER_WINS;

  const playGame = (playerChoice) => {
    const computerChoice = getComputerChoice();
    const winner = getWinner(computerChoice, playerChoice);

    let message = `You picked ${playerChoice}, computer picked ${computerChoice}, therefore you `;
    if (winner === RESULT_DRAW) {
      message += "had a DRAW.";
    } else if (winner === RESULT_PLAYER_WINS) {
      message += "WON.";
    } else {
      message += "LOST.";
    }

    Alert.alert("Game Result", message, [
      {
        text: "OK",
        onPress: () => {
          setGameIsRunning(false);
          setEnteredValue("");
        },
      },
    ]);
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
            onPress={() => {
              const playerChoice = getPlayerChoice();
              if (playerChoice) {
                playGame(playerChoice);
              }
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
