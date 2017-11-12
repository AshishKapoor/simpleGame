import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
	TouchableHighlight,
} from 'react-native';

class RandomNumber extends Component {
	
	static propTypes = {
		number: PropTypes.number.isRequired,
	};

	render() {
		return (
			<Text style={styles.randomText}>
					{this.props.number}
			</Text>
		);
	}
}

const styles = StyleSheet.create({
    randomText: {
      backgroundColor: 'lightgrey',
      marginHorizontal: 15,
      marginVertical: 25,
      fontSize: 35,
      textAlign: 'center',
      width: 100,
    }
  });

  export default RandomNumber;