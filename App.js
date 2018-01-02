import React, { Component } from 'react';
import { Pie } from 'react-native-pathjs-charts';
import { AppRegistry, Text, View } from 'react-native';

class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    );
  }
}

export default class LotsOfGreetings extends Component {
  render() {
    let pieData = [{
      "name": "BTC",
      "population": 7694980
    }, {
      "name": "ETH",
      "population": 2584160
    }, {
      "name": "TRIG",
      "population": 6590667
    }
    ]

    let pieOptions = {
      color: '#2980B9',
      r: 50,
      R: 150,
      legendPosition: 'topLeft',
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 15,
        fontWeight: true,
        color: '#ECF0F1'
      }
    }

    let pieStyle = {
    }

    let textStyle = {
      fontSize: 40,
      marginTop: 100,
      textAlign: 'center'
    }

    let amount = '24.2BTC' // TODO

    return (
      <View>
        <Text
          style={textStyle} >
          残高: {amount}
        </Text>

        <Pie
          data={pieData}
          options={pieOptions}
          style={pieStyle}
          accessorKey="population" />
      </View>
    )
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => LotsOfGreetings);
