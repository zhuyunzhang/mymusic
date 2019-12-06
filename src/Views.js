/**
 * ScreenBottomTab/index.js
 */
import {createBottomTabNavigator} from 'react-navigation-tabs';

import FindMusic from './components/deal';
import MyMusic from './components/home';
import Friend from './components/mine';
import Account from './components/task';
import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');
const ScreenTab = createBottomTabNavigator(
  {
    FindMusic: {screen: FindMusic},
    MyMusic: {screen: MyMusic},
    Friend: {screen: Friend},
    Account: {screen: Account},
  },
  {
    swipeEnabled: true,
    animationEnabled: true,
    initialRouteName: 'FindMusic',
    lazy: true,
    tabBarOptions: {
      showIcon: true,
      activeTintColor: '#458B74',
      inactiveTintColor: '#cccccc',
    },
  },
);

ScreenTab.navigationOptions = ({navigation}) => {
  const {routeName} = navigation.state.routes[navigation.state.index];
  switch (routeName) {
    case 'FindMusic':
      return FindMusic.headersFind;
    case 'MyMusic':
      return MyMusic.headersFind;
    case 'Friend':
      return Friend.headersFind;
    case 'Account':
      return Account.headersFind;
    default:
      return {routeName};
  }
};

export default ScreenTab;
