// 引入依赖
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// 引入页面组件
import ScreenBottomTab from './Views';
import Player from './components/player/player';
import LoveMusic from './components/player/lovemusic';
import Login from './components/login/login';
import Register from './components/login/register';



/**
 * 自定义 StackNavigator，可以选择 screen 进入方式
 * 默认状态为 card，只需要输入对应页面，比如 ..navigate('ScreenSome1')
 * 如果要使某个页面进入方式为 modal 只需要在路径上加上 Modal
 * 比如：..navigate('ScreenSome2Modal')
 */
const StackModalNavigator = (routeConfigs, navigatorConfig) => {
  const CardStackNavigator = createStackNavigator(routeConfigs, navigatorConfig);
  const modalRouteConfig = {};
  const routeNames = Object.keys(routeConfigs);

  for (let i = 0; i < routeNames.length; i++) {
    modalRouteConfig[`${routeNames[i]}Modal`] = routeConfigs[routeNames[i]];
  }

  const ModalStackNavigator = createStackNavigator(
    {
      CardStackNavigator: {screen: CardStackNavigator},
      ...modalRouteConfig,
    },
    {
      // 如果页面进入方式为 modal，需要自定义 header（默认 header 样式失效，都叠在一块了）
      mode: 'modal',
      headerMode: 'none',
    },
  );

  return ModalStackNavigator;
};

// 配置路由
const AppNavigator = StackModalNavigator({
  ScreenBottomTab: ScreenBottomTab,
  Player: {screen: Player},
  Login: {screen: Login},
  Register: {screen: Register},
  LoveMusic: {screen: LoveMusic},

  //下面几个配置的是测试Navigator不同使用场景用，只需要tab的话，只要ScreenBottomTab: ScreenBottomTab即可
});
const App = createAppContainer(AppNavigator)
export default App;
