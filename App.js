import React from 'react';
import {
    Scene,
    Router,
    Tabs,
} from 'react-native-router-flux';
import Ranking from './components/Ranking';
import Currency from './components/Currency';
import PieChart from './components/PieChart';

const App = () => (
    <Router>
      <Tabs
        key='main'
        swipeEnabled={ true }
        animationEnabled={ true }
      >
        <Scene 
            key='Ranking'
            initial={ true } // 隣接するsceneで最初に表示される
            component={Ranking}
            tabBarLabel="ランキング"
            hideNavBar={true}
        >
          <Scene tabs key="Currency" component={Currency} title="Currency" />
        </Scene>
        <Scene 
            key='PieChart'
            component={PieChart}
            tabBarLabel="円グラフ"
            hideNavBar={true}
        />
      </Tabs>
    </Router>
);

export default App;
