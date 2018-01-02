import React from 'react';
import { StyleSheet, ListView, Text, View, ActivityIndicator } from 'react-native';
import Services from 'binancesdk';
let Configs = require('./configs/Configs');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.services = new Services(Configs);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    // this.testConnectivity();
    this.allBookTickers();
  }

  testConnectivity() {

 
    let test = this.services.test();

    test.then((responseJson) => {

      if (responseJson) {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function () {
          // do something with new state
        });
      } else {
        this.setState({
          isLoading: true
        }, function () {
          // do something with new state
        });
      }

    })
      .catch((error) => {
        console.error(error);
      });
  }

  loadAccountInfo() {
    
    let accountInfo = this.services.accountInfo();

    accountInfo.then((responseJson) => {

      if (responseJson) {
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.balances),
        }, function () {
          // do something with new state
        });
      } else {
        this.setState({
          isLoading: true
        }, function () {
          // do something with new state
        });
      }

    })
      .catch((error) => {
        console.error(error);
      });
  }

  allPricesTickers() {
    
    let accountInfo = this.services.allPricesTickers();

    accountInfo.then((responseJson) => {

      if (responseJson) {
        console.log(responseJson)
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function () {
          // do something with new state
        });
      } else {
        this.setState({
          isLoading: true
        }, function () {
          // do something with new state
        });
      }

    })
      .catch((error) => {
        console.error(error);
      });
  }


  allBookTickers() {
    
    let accountInfo = this.services.allBookTickers();
    accountInfo.then((responseJson) => {

      if (responseJson) {
        console.log(responseJson)
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function () {
          // do something with new state
        });
      } else {
        this.setState({
          isLoading: true
        }, function () {
          // do something with new state
        });
      }

    })
    .catch((error) => {
      console.error(error);
    });
  }


  render() {

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text> testing </Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.symbol}, {rowData.askPrice}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  }
});
