import React, {Component} from 'react';
import {View, Dimensions, Text, DeviceEventEmitter,StyleSheet, Button as Buttons} from 'react-native';
import {Icon as Icons}  from '@ant-design/react-native';
import SplashScreen from 'react-native-splash-screen';
import * as action from '../../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Thumbnail,
  Icon,
  Button,
  ListItem,
  Separator,
  Badge,
  Card,
  CardItem
} from 'native-base';
import Modal from "react-native-modal";
import local from '../../store/storage';

const {height,width} = Dimensions.get('window');

class task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      selected: '',
      loginData:null,
      isModalVisible:false
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
      },()=>{
        // console.log(this.state.loginData.account.id)
        const{actions}=this.props;
        const params = {
          uid: this.state.loginData.account.id,
        }
        actions.GetUserMusicDan(params);
      })
    }).catch(err => {
      console.log(err) //抛出的错误
    })
    this.subscription = DeviceEventEmitter.addListener('UPDATE_USER_DATA', this.refreshData)

  }
  refreshData = () => {
    let _this=this;
    local.get("loginData").then(ret => {
      _this.setState({
        loginData:ret
      },()=>{
        // console.log(this.state.loginData.account.id)
        const{actions}=_this.props;
        const params = {
          uid: _this.state.loginData.account.id,
        }
        actions.GetUserMusicDan(params);
      })
    }).catch(err => {
      console.log(err) //抛出的错误
    })
  };
  componentWillUnmount() {

    this.subscription.remove();

  };
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
    const{navigation}=this.props;
    if(navigation){
      navigation.navigate('Login')
    }
  }
  pressLoveMusic(mid){
    const{navigation}=this.props;
    if(navigation){
      navigation.navigate('LoveMusic',{id:mid})
    }
  }
  toggleModal(){
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }
  toggleDefineModal(){
    local.remove("loginData")
    this.setState({
      isModalVisible:!this.state.isModalVisible,
      loginData:null
    });

  }
  render() {
    const {state} = this.props;
    const {mdan} = state;
    var mpmdan="";
    var mid=0;
    if(mdan !==null ){
      mpmdan=mdan.playlist[0].trackCount
      mid=mdan.playlist[0].id
    }
    return (
      <Container>
        {this.state.loginData == null ?<Header style={styles.headertyles}>
          <Left style={{marginLeft:20}}>
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
            <Thumbnail square source={{uri: this.state.loginData.profile.avatarUrl}} />
          </Left>
          <Body style={{marginLeft:20}}>
            <Text style={{color:'white'}}>{this.state.loginData.profile.nickname}</Text>
            <Text style={{color:'#919191',fontSize:12}} note>{this.state.loginData.account.userName}</Text>
          </Body>
          <Right>
            <Button iconLeft transparent onPress={() => this.toggleModal()}>
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
            <CardItem button onPress={() => this.pressLoveMusic(mid)}>
              <Left>
                <Button>
                  <Icon active name="barcode" />
                </Button>
                <View style={{marginLeft:10}}>
                  <Text >我喜欢的音乐</Text>
                  <Text style={{fontSize:12,color:'red'}}>{mpmdan}首</Text>
                </View>
              </Left>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </CardItem>
          </Card>
          <Separator style={{height:10}} />
          <ListItem icon  onPress={() => this.toggleModal()}>
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
          <Modal
            testID={'modal'}
            animationIn="slideInLeft"
            animationOut="slideOutRight"
            animationInTiming={100}
            animationOutTiming={500}
            backdropTransitionInTiming={400}
            backdropTransitionOutTiming={400}
            isVisible={this.state.isModalVisible}
          >
            <View style={styles.content}>
              <Text style={styles.contentTitle}>确定退出吗？</Text>
              <View style={{flexDirection: "row"}}>
                <View style={{marginRight:20}}>
                  <Buttons testID={'close-button'} onPress={() => this.toggleDefineModal()} title="确定" />
                </View>
                <View style={{marginLeft:20}}>
                  <Buttons testID={'close-button'} onPress={() => this.toggleModal()} title="取消" />
                </View>
              </View>
            </View>
          </Modal>
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  headertyles:{
    height:height/7,
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
});
