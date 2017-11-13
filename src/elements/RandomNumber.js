import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
	TouchableOpacity,
} from 'react-native';

export default class RandomNumber extends Component {
	
	static propTypes = {
		id: PropTypes.number.isRequired,
		number: PropTypes.number.isRequired,
		isDisabled: PropTypes.bool.isRequired,
		onPress: PropTypes.func.isRequired,
	};

	handlePress = () => {
		this.props.onPress(this.props.id);
	}

	render() {
		return (
			<TouchableOpacity onPress={this.handlePress}>
				<Text 
				style={[styles.randomText, this.props.isDisabled ? styles.selected : styles.notSelected]}
				>
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
	}
);