import React from 'react';
import { ScrollView, StyleSheet, ListView, Text, View, ActivityIndicator } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements'
import Services from 'binancesdk';
import cc from 'cryptocompare';
let Configs = require('./configs/Configs');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.services = new Services(Configs);
    this.state = {
      isLoading: true,
      list: [],
    }
  }

  componentDidMount() {

    cc.topPairs('BTC', 1000)
    .then(pairs => {
      if (pairs) {
        console.log(pairs.length);
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          isLoading: false,
          list: pairs
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
    .catch(console.error)

    // this.allBookTickers();
  }

  allBookTickers() {
    
    let accountInfo = this.services.allBookTickers();
    accountInfo.then((responseJson) => {
      if (responseJson) {
        console.log(responseJson.length);
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
        <ScrollView>
          <List>
            {
              this.state.list.map((item, i) => (
                <ListItem
                  key={i}
                  title={item.toSymbol}
                  subtitle={"出来高:" + item.volume24h + "BTC"}
                  avatar={{uri:"https://dummyimage.com/600x400/000/ffffff&text=" + (i+1) + "位"}}
                />
              ))
            }
          </List>
        </ScrollView>
        <Button
          raised
          buttonStyle={{backgroundColor: 'green', borderRadius: 10}}
          textStyle={{textAlign: 'center'}}
          title={"更新"}
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
