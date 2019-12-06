import React, {Component } from 'react';
import {View, Dimensions} from 'react-native';
import {Button, Icon} from '@ant-design/react-native';
import SplashScreen from 'react-native-splash-screen';

import * as action from '../../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const {height} = Dimensions.get('window');

class mine extends Component {
  componentDidMount() {
    // 隐藏启动页，如果不设置消失时间，在组件加载完启动页自动隐藏
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }

  static headersFind={
    header: null,
  };

  static navigationOptions = {
    title: '我的',
    tabBarIcon: ({focused, tintColor}) => (
      <Icon name="team" size={25} color={tintColor} />
    ),
  };

  onChange = value => {
    this.setState({value});
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      selected: '',
    };
    // this.navigation = props.navigation;
  }

  render() {
    const {actions, state, navigation} = this.props;
    return (
      <View style={styles.container}>
        <Button type="warning">这是首页按钮</Button>
      </View>
    );
  }
}

export default connect(
  state => ({
    state: state.user,
  }),
  dispatch => ({
    actions: bindActionCreators(action.user, dispatch),
  }),
)(mine);
const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
};
