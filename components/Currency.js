import React from 'react';
import { View, ScrollView, StyleSheet, ListView, Text, ActivityIndicator } from 'react-native';
import { Avatar, List, ListItem } from 'react-native-elements'
import { Header, Body, Button, Title, Footer, FooterTab, Container, Content, Left, Right, Segment, Icon } from 'native-base';
import cc from 'cryptocompare';
import Spinner from 'react-native-loading-spinner-overlay';
import { Scene, Router } from 'react-native-router-flux';
import { Actions } from "react-native-router-flux";
import StatusBarBackground from './StatusBarBackground'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';



let Configs = require('../configs/Configs');
// colors from https://coolors.co/0a2239-53a2be-1d84b5-132e32-176087
const [color1, color2, color3, color4, color5, white] =
  ["#0A2239", "#53A2BE", "#1D84B5", "#132E32", "#176087", "#FFFFFF"];

export default class Currency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      currencyName: 'BTC',
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ isLoading: false });
    this.price();
  }

  price() {
    this.setState({ isLoading: true });
    cc.priceFull(this.state.currencyName, ['JPY']).then(price => {
      if (price) {
        console.log(price[this.state.currencyName].JPY);
        let currency = price[this.state.currencyName].JPY;
        data = [
          ["シンボル", currency.FROMSYMBOL],
          ["現在値", currency.PRICE],
          ["時価総額", currency.MKTCAP],
          ["24時間変化", currency.CHANGE24HOUR],
          ["24時間最低値", currency.LOW24HOUR],
          ["24時間最高値", currency.HIGH24HOUR],
          ["24時間出来高", currency.TOTALVOLUME24HTO],
        ];
        this.setState({
          data: data,
          isLoading: false,
          /// dataSource: ds.cloneWithRows(price),
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

  renderSpinner() {
    return <Spinner visible={this.state.isLoading} textContent={"読み込み中..."} textStyle={{color: white}} overlayColor={color2} />;
  }

  render() {
    if (this.state.isLoading) return this.renderSpinner();

    return (

      <Container style={styles.container}>
        <StatusBarBackground />
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Text>{'<'}</Text>
            </Button>
          </Left>
          <Body>
            <Title>{this.state.currencyName}</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Table>
            <Row data={['説明', 'データ']} style={styles.head} textStyle={styles.text}/>

            <Rows data={this.state.data} style={styles.row} textStyle={styles.text}/>
          </Table>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
  },
  buttonText: {
    color: white,
    fontSize: 15,
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { marginLeft: 5 },
  row: { height: 30 }
});
