import React from 'react';
import { ScrollView, StyleSheet, ListView, Text, ActivityIndicator } from 'react-native';
import { Avatar, List, ListItem } from 'react-native-elements'
import { Header, Body, Button, Title, Footer, FooterTab, Icon, Container, Content, Left, Right, Segment } from 'native-base';
import cc from 'cryptocompare';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions } from "react-native-router-flux";
import { Pie } from 'react-native-pathjs-charts';

let Configs = require('../configs/Configs');
// colors from https://coolors.co/0a2239-53a2be-1d84b5-132e32-176087
const [color1, color2, color3, color4, color5, white] =
  ["#0A2239", "#53A2BE", "#1D84B5", "#132E32", "#176087", "#FFFFFF"];

export default class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows([]),

      pieData: [{
          "name": "BTC",
          "population": 7694980
        }, {
          "name": "ETH",
          "population": 2584160
        }, {
          "name": "TRIG",
          "population": 6590667
        }
      ],
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ isLoading: false });
    this.allPairs();
  }

  allPairs() {
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

  renderSpinner() {
    return <Spinner visible={this.state.isLoading} textContent={"読み込み中..."} textStyle={{color: white}} overlayColor={color2} />;
  }

  render() {
    if (this.state.isLoading) return this.renderSpinner();

    return (
      <Container>
        <Header hasTabs style={styles.header}>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>円グラフ</Title>
          </Body>
          <Right />
        </Header>
        <Segment>
          <Button
            first
            onPress={() => { Actions.Ranking() }}
          >
            <Text style={styles.tabButtonText}>ランキング</Text>
          </Button>
          <Button
            last
            active
          >
            <Text style={styles.tabButtonText} >円グラフ</Text>
          </Button>
        </Segment>
        <Content padder>
          <Pie
            data={this.state.pieData}
            options={pieOptions}
            style={styles.pie}
            accessorKey="population" />
        </Content>
        <Button
          full
          style={{backgroundColor: color3}}
          onPress={() => {
            this.allPairs();
          }}
        >
          <Text style={styles.buttonText}>更新</Text>
        </Button>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  header: {
  },
  buttonText: {
    color: white,
    fontSize: 15,
  },
  pie: {

  }
});


const pieOptions = {
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
