import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import RandomNumber from './../elements/RandomNumber';

class Game extends Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
  };

  state = {
    selectedIds: [],
    remainingSeconds: this.props.initialSeconds,
  };

  gameStatus = 'PLAYING';
  isNumberSelected = (numberIndex) => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  }

  selectNumber = (numberIndex) => {
    this.setState((prevState) => ({
      selectedIds: [...prevState.selectedIds, numberIndex],
    }));
  };

  randomNumbers = Array
    .from({ length: this.props.randomNumberCount })
    .map( () => 1 + Math.floor(10 * Math.random()) );
  
  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((accumulator, current) => accumulator + current, 0);

  componentDidMount(){
    this.intervalId = setInterval(() => {
      this.setState((prevState) => {
        return {remainingSeconds: prevState.remainingSeconds - 1};
      }, () => {
        if (this.state.remainingSeconds === 0) {
          clearInterval(this.intervalId);
        }
      });
    }, 1000);
  }

  componentWillUpdate(nextProps, nextState){
    if (nextState.selectedIds !== this.state.selectedIds || nextState.remainingSeconds === 0) {
      this.gameStatus = this.calcGameStatus(nextState);
    }
  }

  componentDidUnMount() {
    clearInterval(this.intervalId);
  }

  // gameStatus: PLAYING, WON, LOST
  calcGameStatus = (nextState) => {
    const sumSelected = nextState.selectedIds.reduce((accumulator, current) => {
      return accumulator + this.randomNumbers[current];
    }, 0);
    if(nextState.remainingSeconds === 0) {
      return 'LOST';
    }
    if(sumSelected < this.target) {
      return 'PLAYING';
    }
    if(sumSelected === this.target) {
      return 'WON';
    }
    if(sumSelected > this.target) {
      return 'LOST';
    }
  }

  render() {
    const gameStatus = this.gameStatus;
    return (
      <View style={styles.container}>
        <Text style={[styles.targetText, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
        <View style={styles.randomContainer}>
          {this.randomNumbers.map((randomNumber, index) => 
            <RandomNumber 
              key={index}
              id={index}
              number={randomNumber} 
              isDisabled={this.isNumberSelected(index) || gameStatus !== 'PLAYING'}
              onPress={this.selectNumber}
            />
          )}
        </View>
        <Button 
          title="Play Again" 
          onPress={this.props.onPlayAgain}>
        </Button>
        <Text>{this.state.remainingSeconds}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 35,
  },
  targetText: {
    fontSize: 50,
    textAlign: 'center',
    margin: 50,
    backgroundColor: 'lightgrey',
  },
  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gameStatusText: {
    fontSize: 25,
    textAlign: 'center',
    margin: 25,
    backgroundColor: 'white',
  },
  STATUS_PLAYING: {
    backgroundColor: '#bbb'
  },
  STATUS_WON: {
    backgroundColor: 'green'
  },
  STATUS_LOST: {
    backgroundColor: 'red'
  },

});

export default Game;