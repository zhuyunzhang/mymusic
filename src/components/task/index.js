import React, {Component} from 'react';
import {View, Dimensions, Text, Alert} from 'react-native';
import {Icon as Icons}  from '@ant-design/react-native';
import SplashScreen from 'react-native-splash-screen';
import * as action from '../../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Container, Content, Header, Left, Body, Right, Thumbnail,Icon,Button,ListItem,Separator,Badge,Card,CardItem} from 'native-base';
import local from '../../store/storage';

const {height,width} = Dimensions.get('window');

class task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      selected: '',
      loginData:null
    };
    // this.navigation = props.navigation;
  }
  componentDidMount() {
    // 隐藏启动页，如果不设置消失时间，在组件加载完启动页自动隐藏
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
    local.get("loginData").then(ret => {
      this.setState({
        loginData:ret
      })
    }).catch(err => {
      console.log(err) //抛出的错误
    })

  }

  static headersFind={
    header: null,
  };

  static navigationOptions = {
    title: '我的',
    tabBarIcon: ({focused, tintColor}) => (
      <Icons name="team" size={25} color={tintColor} />
    ),
  };

  onChange = value => {
    this.setState({value});
  }


  onPressSelect(){
    Alert.alert("=======>>>")
    const{navigation}=this.props;
    if(navigation){
      navigation.navigate('Login',{
        refresh: function () {
          this.init();
        }
      })
    }
  }
  render() {
    const {actions, state, navigation} = this.props;
    const uri = "https://cdn2.jianshu.io/assets/default_avatar/2-9636b13945b9ccf345bc98d0d81074eb.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240";
    return (
      <Container>
        {this.state.loginData == null ?<Header style={styles.headertyles}>
          <Left style={{marginLeft:20}}>
            {/*<Thumbnail square source={{uri: uri}} />*/}
          </Left>
          <Body style={{marginLeft:55}}>
            <Button iconLeft onPress={() => this.onPressSelect()}>
              <Icon name='log-in' />
              <Text style={{color:'white',fontSize:20,marginRight:10}} note>请登录</Text>
            </Button>
          </Body>
          <Right>
          </Right>
        </Header>
          :
        <Header style={styles.headertyles}>
          <Left style={{marginLeft:20}}>
            <Thumbnail square source={{uri: uri}} />
          </Left>
          <Body style={{marginLeft:20}}>
            <Text style={{color:'white'}}>NativeBase</Text>
            <Text style={{color:'white'}} note>GeekyAnts</Text>
          </Body>
          <Right>
            <Button iconLeft transparent>
              <Icon name='cog' />
            </Button>
          </Right>
        </Header>}
        <Content>
          <Separator style={{height:10}} />
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
                <Icon active name="musical-notes" />
              </Button>
            </Left>
            <Body>
              <Text>本地音乐</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="headset" />
              </Button>
            </Left>
            <Body>
              <Text>最近播放</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "red" }}>
                <Icon active name="download" />
              </Button>
            </Left>
            <Body>
              <Text>下载管理</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#54FF9F" }}>
                <Icon active name="radio" />
              </Button>
            </Left>
            <Body>
              <Text>我的电台</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#EE1289" }}>
              <Icon active name="heart" />
            </Button>
            </Left>
            <Body>
              <Text>我的收藏</Text>
            </Body>
            <Right>
              <Badge style={{height:20}}>
                <Text>2</Text>
              </Badge>
            </Right>
          </ListItem>
          <Separator style={{height:10}} />
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Body>
                  <Text style={{fontSize:16,fontWeight:'bold'}}>创建的歌单</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Button >
                  <Icon active name="radio" />
                </Button>
                <View style={{marginLeft:10}}>
                  <Text >我喜欢的音乐</Text>
                  <Text style={{fontSize:12,color:'red'}}>0首</Text>
                </View>
              </Left>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </CardItem>
          </Card>
          <Separator style={{height:10}} />
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#969696" }}>
                <Icon active name="refresh" />
              </Button>
            </Left>
            <Body>
              <Text>软件更新</Text>
            </Body>
            <Right>
              <Badge style={{height:20}}>
                <Text>2</Text>
              </Badge>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
                <Icon active name="information-circle-outline" />
              </Button>
            </Left>
            <Body>
              <Text>当前版本</Text>
            </Body>
            <Right>
              <Text style={{color:'#B0B0B0'}}>v1.0.0</Text>
            </Right>
          </ListItem>

        </Content>
      </Container>
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
)(task);
const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  headertyles:{
    height:height/7,
  }
};
