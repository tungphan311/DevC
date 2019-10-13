import React, { useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Modal, 
  TouchableHighlight 
} from 'react-native'
import Button from './Button';
import ChoiceCard from './ChoiceCard';
import { CHOICES } from './const';
import History from './History';

export default function App () {
  const [gamePrompt, setGamePrompt] = useState('Choose your weapon!');
  const [userChoice, setUserChoice] = useState({});
  const [comChoice, setComChoice] = useState({});
  const [showModal, toggleShowModal] = useState(false);
  const [win, setWin] = useState(0);
  const [lose, setLose] = useState(0);
  const [tie, setTie] = useState(0);

  const randomComputerChoice = () =>
    CHOICES[Math.floor(Math.random() * CHOICES.length)];

  const getRoundOutcome = userChoice => {
    const computerChoice = randomComputerChoice().name;
    let result;

    if (userChoice === 'rock') {
      result = computerChoice === 'scissors' ? 'Victory!' : 'Defeat!';
    }
    if (userChoice === 'paper') {
      result = computerChoice === 'rock' ? 'Victory!' : 'Defeat!';
    }
    if (userChoice === 'scissors') {
      result = computerChoice === 'paper' ? 'Victory!' : 'Defeat!';
    }

    if (userChoice === computerChoice) result = 'Tie game!';
    return [result, computerChoice];
  };

  const onPress = userChoice => {
    const [result, compChoice] = getRoundOutcome(userChoice);

    const newUserChoice = CHOICES.find(choice => choice.name === userChoice);
    const newComputerChoice = CHOICES.find(choice => choice.name === compChoice);

    if (result === 'Victory!') {
      setWin(win + 1);
    } else if (result === 'Defeat!') {
      setLose(lose + 1);
    } else {
      setTie(tie + 1)
    }

    setGamePrompt(result);
    setUserChoice(newUserChoice);
    setComChoice(newComputerChoice);
  }

  const getResultColor = () => {
    if (gamePrompt === 'Victory!') return 'green';
    if (gamePrompt === 'Defeat!') return 'red';
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: getResultColor(), fontSize: 35 }}>{gamePrompt}</Text>
      <View style={styles.choicesContainer}>
        <ChoiceCard player='Player' choice={userChoice} />
        <Text style={{ color: '#250902' }}>vs</Text>
        <ChoiceCard player='Computer' choice={comChoice} />
      </View>
      { CHOICES.map(({ name }) => <Button key={name} name={name} onPress={onPress} />) }

      <TouchableOpacity onPress={() => {
          (win + lose + tie > 0) ?toggleShowModal(true) : alert("You haven't played yet!!")
      }}>
        <Text style={{ marginTop: 15, fontSize: 20, textDecorationLine: 'underline' }}>View history</Text>
      </TouchableOpacity>

      <History 
        showModal={showModal} 
        toggleShowModal={() => toggleShowModal(false)} 
        win={win} 
        lose={lose} 
        tie={tie} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9ebee'
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  choicesContainer: {
    margin: 10,
    borderWidth: 2,
    paddingTop: 100,
    shadowRadius: 5,
    paddingBottom: 100,
    borderColor: 'grey',
    shadowOpacity: 0.90,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { height: 5, width: 5 },
  }
});