import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import RandomNumber from './../elements/RandomNumber';

class Game extends Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
  };

  state = {
    selectedIds: [],
  };

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

  // gameStatus: PLAYING, WON, LOST
  gameStatus = () => {
    const sumSelected = this.state.selectedIds.reduce((accumulator, current) => {
      return accumulator + this.randomNumbers[current];
    }, 0);
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
    const gameStatus = this.gameStatus();
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
        <Text style={[styles.gameStatusText, styles[`STATUS_${gameStatus}`]]}>{gameStatus}</Text>
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