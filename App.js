import React, { Component } from 'react';
import Game from './src/components/Game'

export default class App extends Component {
  render() {
    return (
      <Game 
      randomNumberCount={6}
      initialSeconds={10}
      />
    );
  }
}