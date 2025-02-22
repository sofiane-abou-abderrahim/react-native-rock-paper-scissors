import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const DEFAULT_USER_CHOICE = ROCK;

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

    console.log(selection);

    return selection;
  };

  return (
    <View>
      {gameIsRunning ? (
        <View>
          <Text>Enter Your Choice</Text>
          <TextInput
            placeholder="ROCK, PAPER or SCISSORS?"
            onChangeText={(text) => setEnteredValue(text)}
            value={enteredValue}
          />
          <Button title="Confirm" onPress={getPlayerChoice} />
        </View>
      ) : (
        <Button
          title="Start Game"
          color="#841584"
          onPress={startNewGameHandler}
        />
      )}
    </View>
  );
}

export default StartGameScreen;
