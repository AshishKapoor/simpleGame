import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
	TouchableOpacity,
} from 'react-native';

class RandomNumber extends Component {
	
	static propTypes = {
		number: PropTypes.number.isRequired,
		isSelected: PropTypes.bool.isRequired,
	};

	handlePress(){
		// this.setState({
		// 	isSelected: true,
		// })
	}

	render() {
		return (
			<TouchableOpacity onPress={this.handlePress()}>
				<Text style={[styles.randomText, this.props.isSelected ? styles.selected : styles.notSelected]}>
					{this.props.number}
				</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
    randomText: {
      backgroundColor: 'darkgrey',
      marginHorizontal: 15,
      marginVertical: 25,
      fontSize: 35,
      textAlign: 'center',
			width: 100,
		},
		selected: {
			opacity: 0.3,
		},
		notSelected: {

		}
  });

  export default RandomNumber;