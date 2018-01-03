import React from 'react';
import { ScrollView, StyleSheet, ListView, Text, View, ActivityIndicator } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements'
import Services from 'binancesdk';
import cc from 'cryptocompare';
import Spinner from 'react-native-loading-spinner-overlay';

let Configs = require('./configs/Configs');
// colors from https://coolors.co/0a2239-53a2be-1d84b5-132e32-176087
const [color1, color2, color3, color4, color5, white] =
  ["#0A2239", "#53A2BE", "#1D84B5", "#132E32", "#176087", "#FFFFFF"];



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.services = new Services(Configs);
    this.state = {
      isLoading: false,
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows([]),
    }
  }

  componentDidMount() {
    this.allPairs();
    // this.allBookTickers();
  }

  allPairs() {
    if (this.state.isLoading) return;
    this.setState({ isLoading: true });
    cc.topPairs('BTC', 50).then(pairs => {
      if (pairs) {
        // console.log(pairs);
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(pairs),
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

  renderRow (rowData, sectionID, rowID) {
    console.log(rowData);
    return (
      <ListItem
        key={sectionID}
        title={rowData.toSymbol}
        subtitle={"出来高:" + rowData.volume24h + "BTC"}
        avatar={{uri:"https://dummyimage.com/600x400/000/ffffff&text=" + (parseInt(rowID)+1) + "位"}}
      />
    )
  }


  render() {
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.isLoading} textContent={"読み込み中..."} textStyle={{color: white}} overlayColor={color2} />

        <Text
          style={styles.h1}
        >
          仮想通貨24h出来高ランキング
        </Text>
        <List>
          <ListView
            renderRow={this.renderRow}
            dataSource={this.state.dataSource}
            enableEmptySections={true}
            
          />
        </List>

        <Button
          raised
          buttonStyle={{backgroundColor: color3, borderRadius: 10}}
          onPress={() => {
            this.allPairs();
          }}
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
    marginBottom: 100,
  },
  h1: {
    fontSize: 30,
  },
});
