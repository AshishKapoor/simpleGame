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
    selectedNumbers: [0, 4],
  };

  isNumberSelected = (numberIndex) => {
    return this.state.selectedNumbers.indexOf(numberIndex) >= 0;
  }

  _multiOptions(number){
    return (
      number.map((randomNumber, index) => 
        <RandomNumber 
        key={index} 
        number={randomNumber} 
        isSelected={this.isNumberSelected(index)}
        />
      )
    );
  }

  randomNumbers = Array
    .from({ length: this.props.randomNumberCount })
    .map( () => 1 + Math.floor(10 * Math.random()) );
  
  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount)
    .reduce((accumulator, current) => accumulator + current, 0);

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.targetText}>
          {this.target}
        </Text>
        <View style={styles.randomContainer}>
          {this._multiOptions(this.randomNumbers)}
        </View>
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
});

export default Game;